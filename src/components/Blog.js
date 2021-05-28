import React, { useState } from 'react'


const Blog = ({ blog,
  updateBlog,
  deleteBlog,
  currentUser }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const hideBlogDetailsWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showBlogDetailsWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    paddingBottom: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    border: '1px solid #cfcab4'
  }

  const updateLikes = (event) => {
    event.preventDefault()

    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: currentUser
    }

    blog.likes = blogObject.likes

    updateBlog(blogObject)
  }

  const removeBlog = (event) => {
    event.preventDefault()

    let dialogResult = window.confirm(`Remove blog ${blog.title}?`)

    if (dialogResult === true) {
      deleteBlog(blog)
      return
    }
    else {
      return
    }
  }

  function RemoveButton(user, currentUser) {
    if (user.id === currentUser.id)
    {
      return <div>
        <button id='remove-button' onClick={removeBlog}>remove</button>
      </div>
    }
    else
    {
      return <></>
    }
  }


  return (
    <div style={blogStyle}>
      <div id='blog-title' className='title blog-title'>{blog.title}</div>
      <div className='author'>{blog.author}</div>
      <div>
        <div style={hideBlogDetailsWhenVisible}>
          <button id='view-button' className='view-button' onClick={() => setBlogDetailsVisible(true)}>View</button>
        </div>
        <div style={showBlogDetailsWhenVisible}>
          <div className='url'>{blog.url}</div>
          <div id='likes-div' className='likes'>likes {blog.likes} <button id='update-likes-button' className='update-likes-button'  onClick={updateLikes}>like</button></div>
          <div>
            <button  id='hide-button' className='hide-button' onClick={() => setBlogDetailsVisible(false)}>Hide</button>
          </div>
          <RemoveButton user={blog.user} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Blog