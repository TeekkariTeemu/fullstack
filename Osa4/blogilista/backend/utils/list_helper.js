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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  topBlogger
}