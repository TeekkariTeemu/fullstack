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

describe('favorite blog', () => {
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

  test('when list has only one blog favorite is that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })
  test('when list has many blogs favorite is', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'juutupe',
      author: 'juutuuperi',
      likes: 100
    })
  })
  test('when list has no blogs the favorite is empty', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    expect(result).toEqual({
      title: '',
      author: '',
      likes: 0
    })
  })
})

describe('top blogger', () => {
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
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]
  const listWithNoBlogs = [
  ]

  test('when list has only one blog top blogger is that', () => {
    const result = listHelper.topBlogger(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })
  test('when list has many blogs top blogger is', () => {
    const result = listHelper.topBlogger(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
  test('when list has no blogs the top blogger is empty', () => {
    const result = listHelper.topBlogger(listWithNoBlogs)
    expect(result).toEqual({
      author: '',
      blogs: 0
    })
  })
})