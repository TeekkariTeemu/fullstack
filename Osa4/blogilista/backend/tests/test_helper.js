const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'John Doe',
    url: 'https://example.com/first-blog',
    likes: 10,
    id: '646cbb9212eb6e454eb6397b'
  },
  {
    title: 'Second Blog',
    author: 'Jane Smith',
    url: 'https://example.com/second-blog',
    likes: 5,
    id: '789abcde1234567890'
  },
  {
    title: 'Third Blog',
    author: 'John Doe',
    url: 'https://example.com/third-blog',
    likes: 8,
    id: '0987654321fedcba'
  },
  {
    title: 'Fourth Blog',
    author: 'Alice Johnson',
    url: 'https://example.com/fourth-blog',
    likes: 3,
    id: 'a1b2c3d4e5f6g7h8i9j0'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb,
}