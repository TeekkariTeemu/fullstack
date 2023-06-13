const _ = require('lodash')

const dummy = (blogs) => {
  return 1

}

const totalLikes = (blogs) => {
  let totalLikes = 0
  for (let x in blogs){
    totalLikes += blogs[x].likes
  }

  return totalLikes

}

const favoriteBlog = (blogs) => {
  let max = 0
  let favoriteBlog = {
    title:'',
    author:'',
    likes:0
  }
  for (let x in blogs){
    if(blogs[x].likes > max){
      max = blogs[x].likes
      favoriteBlog = {
        title:blogs[x].title,
        author:blogs[x].author,
        likes:blogs[x].likes

      }
    }
  }

  return favoriteBlog
}

const topBlogger = (blogs) => {

  if(blogs.length === 0){
    let topBlogger = {
      author:'',
      blogs:0
    }
    return topBlogger
  } else{

    const authorCounts = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])
    let topBlogger = { author: topAuthor,
      blogs: authorCounts[topAuthor]
    }
    return topBlogger
  }
}

const favoriteBlogger = (blogs) => {

  if(blogs.length === 0){
    let favoriteBlogger = {
      author:'',
      likes:0
    }
    return favoriteBlogger
  } else{
    const authorLikes = _.groupBy(blogs, 'author')

    let maxLikes = 0
    let topAuthor = ''

    _.forEach(authorLikes, (blogs, author) => {
      const totalLikes = _.sumBy(blogs, 'likes')

      if (totalLikes > maxLikes) {
        maxLikes = totalLikes
        topAuthor = author
      }
    })
    let favoriteBlogger = {
      author: topAuthor,
      likes: maxLikes
    }
    return favoriteBlogger
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  topBlogger,
  favoriteBlogger
}