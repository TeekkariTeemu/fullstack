import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  const addBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)

      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)

      setSuccessMessage(`Added a new blog: ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      if (toggleRef.current) {
        toggleRef.current.toggleVisibility()
      }

    } catch (exception) {
      setErrorMessage('Failed to create a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h2>blogs</h2>
        <Togglable buttonLabel="New Blog" ref={toggleRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  const toggleRef = useRef()

  return (
    <div>

      <Notification message={errorMessage} className="error" />
      <Notification message={successMessage} className="success" />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
        {blogForm()}
      </div>
      }
    </div>
  )
}

export default App