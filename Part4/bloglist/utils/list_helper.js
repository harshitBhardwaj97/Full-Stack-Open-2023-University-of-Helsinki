const dummy = (blogs) => {
  return 1;
};

const returnLikesOfBlogList = (blogList) => {
  if (blogList.length === 1) {
    return blogList[0].likes;
  } else {
    let likes = 0;
    blogList.forEach((blog) => {
      likes += blog.likes;
    });
    return likes;
  }
};

const returnBlogWithMaxLikes = (blogList) => {
  console.log(blogList.length);
  if (blogList.length === 1) {
    return {
      title: blogList[0].title,
      author: blogList[0].author,
      likes: blogList[0].likes,
    };
  } else {
    return blogList.reduce((max, blog) =>
      max.likes > blog.likes
        ? {
            title: max.title,
            author: max.author,
            likes: max.likes,
          }
        : {
            title: blog.title,
            author: blog.author,
            likes: blog.likes,
          }
    );
  }
};

const findMostBlogsAuthor = (blogList) => {
  const counts = blogList.reduce((acc, blog) => {
    const author = blog.author;

    if (acc[author]) {
      acc[author]++;
    } else {
      acc[author] = 1;
    }

    return acc;
  }, {});

  let maxAuthor = "";
  let maxCount = 0;

  for (const author in counts) {
    if (counts[author] > maxCount) {
      maxAuthor = author;
      maxCount = counts[author];
    }
  }

  return {
    author: maxAuthor,
    blogs: maxCount,
  };
};

const findMostTotalLikesAuthor = (blogsList) => {
  let authorLikes = {};

  for (let blog of blogsList) {
    let author = blog.author;
    let likes = blog.likes;

    if (author in authorLikes) {
      authorLikes[author] += likes;
    } else {
      authorLikes[author] = likes;
    }
  }
  let mostLikesAuthor = null;
  let maxLikes = 0;
  for (let author in authorLikes) {
    let likes = authorLikes[author];
    if (likes > maxLikes) {
      mostLikesAuthor = author;
      maxLikes = likes;
    }
  }
  return {
    author: mostLikesAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  returnLikesOfBlogList,
  returnBlogWithMaxLikes,
  findMostBlogsAuthor,
  findMostTotalLikesAuthor,
};
