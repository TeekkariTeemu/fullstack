const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

const bcrypt = require('bcrypt')
const User = require('../models/user')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  const response = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })

  token = response.body.token
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all Blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier in style "id", not "_id"', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'added blog',
    author: 'blog adder',
    url: 'https://example.com/new-blog',
    likes: 15
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(
    'added blog'
  )
})

test('Blog with no likes gets a value of 0', async () => {
  const newBlog = {
    title: 'no likes blog',
    author: 'blog adder',
    url: 'https://example.com/no-likes',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.find(blog => blog.title === 'no likes blog')

  expect(addedBlog.likes).toBe(0)

})

test('Blog without title or url returns status code 400', async () => {

  const blogWithoutTitle = {
    author: 'blog adder',
    url: 'https://example.com/no-title',
    likes: 13
  }

  const blogWithoutUrl = {
    title: 'no url blog',
    author: 'blog adder',
    likes: 13
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutUrl)
    .expect(400)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

test('Adding +1 like to a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const updatedBlogs = response.body

  const likes = updatedBlogs.map(blog => blog.likes)
  expect(likes).toContain(blogToUpdate.likes + 1)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const existingUser = usersAtStart[0]

    const newUser = {
      username: existingUser.username,
      name: 'Test User',
      password: 'password123',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


describe('User creation validation', () => {
  test('Malformed user cannot be created - missing username', async () => {
    const newUser = {
      name: 'John Doe',
      password: '123456'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('Malformed user cannot be created - missing password', async () => {
    const newUser = {
      username: 'johndoe',
      name: 'John Doe'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('Malformed user cannot be created - invalid password length', async () => {
    const newUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})