import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders blog title and author by default', () => {
  const blog = {
    id: 1,
    title: 'Testi Blogi',
    author: 'Jaska Jokunen',
    url: 'https://testi.fi',
    likes: 10,
    user: {
      username: 'jaska',
    },
  }

  render(<Blog blog={blog} />)
  const titleElement = screen.getByRole('heading', { name: /Testi Blogi/i })
  const authorElement = screen.getByText(/by: Jaska Jokunen/i)

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
})

test('renders blog URL and number of likes when details button is clicked', async () => {
  const blog = {
    id: 1,
    title: 'Testi Blogi',
    author: 'Jaska Jokunen',
    url: 'https://testi.fi',
    likes: 10,
    user: {
      username: 'jaska',
    },
  }



  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('Show Details')
  await user.click(button)

  const urlElement = screen.getByText(/https:\/\/testi\.fi/i)
  const likesElement = screen.getByText(/Likes: 10/i)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})

jest.mock('../services/blogs', () => ({
  update: jest.fn(),
}))

test('clicking the button adds a Like', async () => {
  const blog = {
    id: 1,
    title: 'Testi Blogi',
    author: 'Jaska Jokunen',
    url: 'https://testi.fi',
    likes: 10,
    user: {
      username: 'jaska',
    },
  }

  render(<Blog blog={blog} />)

  const showDetailsButton = screen.getByText('Show Details')

  await userEvent.click(showDetailsButton)

  const likeButton = screen.getByText('Like')

  await userEvent.click(likeButton)

  const likesText = screen.getByText(/Likes: \d+/)

  expect(likesText).toHaveTextContent(`Likes: ${blog.likes + 1}`)
})

test('calls the event handler with the right details when a new blog is created', async () => {
  const addBlogMock = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlogMock} author={() => {}} title={() => {}} />)

  const titleInput = screen.getByRole('textbox', { name: 'Title:' })
  const authorInput = screen.getByRole('textbox', { name: 'Author:' })
  const urlInput = screen.getByRole('textbox', { name: 'url:' })

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://example.com')

  await user.click(screen.getByRole('button', { name: 'create' }))

  expect(addBlogMock).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'https://example.com',
  })
})