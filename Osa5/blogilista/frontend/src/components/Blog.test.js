import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

  const mockHandler = jest.fn()

  render(<Blog blog={blog} showDetails={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Show Details')
  await user.click(button)

  const urlElement = screen.getByText(/https:\/\/testi\.fi/i)
  const likesElement = screen.getByText(/Likes: 10/i)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})
