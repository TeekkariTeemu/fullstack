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

module.exports = {
  dummy,
  totalLikes
}
