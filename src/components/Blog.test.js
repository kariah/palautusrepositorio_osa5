import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

//5.14
test('renders basic content', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog Url',
    likes: '1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  //   component.debug()

  //   expect(component.container).toHaveTextContent(
  //     'Component testing is done with react-testing-library'
  //   )

  //   const element = component.getByText(
  //     'Component testing is done with react-testing-library'
  //   )
  //   expect(element).toBeDefined()

  let div = component.container.querySelector('.author')
  expect(div).toHaveTextContent(
    'Blog Author'
  )

  div = component.container.querySelector('.title')
  expect(div).toHaveTextContent(
    'Blog Title'
  )

  div = component.container.querySelector('.url')
  expect(div).not.toBeVisible()

  div = component.container.querySelector('.likes')
  expect(div).not.toBeVisible()
})

//5.14
test('clicking view button shows all blog content', async () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog Url',
    likes: '1'
  }

  const component = render(
    <Blog blog={blog} />
  )

  //   component.debug()

  const button = component.container.querySelector('.view-button')
  fireEvent.click(button)

  let div = component.container.querySelector('.url')
  expect(div).toHaveTextContent(
    'Blog Url'
  )

  div = component.container.querySelector('.likes')
  expect(div).toHaveTextContent(
    '1'
  )
})

//5.15
test('clicking the likes button call event handler twice', async () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog Url',
    likes: '1'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler}  />
  )

  //   component.debug()

  const viewButton = component.container.querySelector('.view-button')
  fireEvent.click(viewButton)

  const updateLikesButton = component.container.querySelector('.update-likes-button')
  fireEvent.click(updateLikesButton)
  fireEvent.click(updateLikesButton)

  //   console.log('mockHandler.mock.calls.length ', mockHandler.mock.calls.length)

  expect(mockHandler.mock.calls.length).toBe(2)
})



