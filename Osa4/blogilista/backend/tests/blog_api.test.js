const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
    likes: 13
  }

  await api
    .post('/api/blogs')
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
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})