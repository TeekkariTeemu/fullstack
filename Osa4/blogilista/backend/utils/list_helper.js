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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}