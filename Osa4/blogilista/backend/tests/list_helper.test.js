const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      title: 'My Blog Post',
      author: 'John Doe',
      url: 'https://example.com',
      likes: 10,
      id: '646cbb9212eb6e454eb6397b'
    },
    {
      title: 'Reaktori',
      author: 'Professori',
      url: 'https://esim.com',
      likes: 66,
      id: '646f0b3c3c9a05ff71449738'
    },
    {
      title: 'Traktori',
      author: 'Pro',
      url: 'https://traktor.com',
      likes: 99,
      id: '646f0e5eda945d467f7dfcc7'
    },
    {
      title: 'juutupe',
      author: 'juutuuperi',
      url: 'https://juutuup.com',
      likes: 100,
      id: '646f100548b767bb5fa8b99d'
    },
    {
      title: 'Blogi',
      author: 'Blogaaja',
      url: 'https://blogpost.com',
      likes: 4,
      id: '646f2cf603fe2f355e18f8bc'
    }
  ]
  const listWithNoBlogs = [
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has many blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(279)
  })
  test('when list has no blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })
})
