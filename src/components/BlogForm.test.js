import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


//5.16
test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog Url',
    likes: '1'
  }

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}  />
  )

  component.debug()

  let input = component.container.querySelector('.title')
  fireEvent.change(input, { target: { value: blog.title } })

  input = component.container.querySelector('.author')
  fireEvent.change(input, { target: { value: blog.author } })

  input = component.container.querySelector('.url')
  fireEvent.change(input, { target: { value: blog.url } })

  const submitFormButton = component.container.querySelector('.submit-form')
  fireEvent.click(submitFormButton)

  //   console.log('createBlog.mock.calls[0][0] ', createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title' )
})



