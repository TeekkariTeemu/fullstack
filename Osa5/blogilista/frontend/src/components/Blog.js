import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  };

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </div>
      {showDetails && (
        <div>
          <p>Likes: {blog.likes}</p>
          <p>URL: {blog.url}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
