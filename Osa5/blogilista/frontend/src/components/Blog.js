import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updatedLikes, setUpdatedLikes] = useState(blog.likes)

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, updatedBlog)
    setUpdatedLikes(updatedBlog.likes)
  };

  return (
    <div className="blog">
      <h3>{blog.title}, by: {blog.author}</h3>
      {showDetails && (
        <>
          <p>Likes: {updatedLikes} <button onClick={handleLike}>Like</button> </p>
          <p>{blog.url}</p>
          {blog.user && <p>Posted by: {blog.user.username}</p>}
        </>
      )}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
    </div>
  );
};

export default Blog
