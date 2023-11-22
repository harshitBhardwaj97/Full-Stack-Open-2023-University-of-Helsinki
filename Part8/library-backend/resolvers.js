let { authors, books } = require("./data");
const { v1: uuid } = require("uuid");
const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        );
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else return books;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (parent) => {
      const author = authors.find((a) => a.name === parent.name);
      const authorBooks = books.filter((book) => book.author === author.name);
      return authorBooks.length;
    },
  },
  Mutation: {
    addBook: (_, args) => {
      let book = { ...args, id: uuid() };
      books = [...books, book];
      const isAuthorPresent = authors.find(
        (author) => author.name === args.author
      );
      if (!isAuthorPresent) {
        const newAuthor = {
          name: args.author,
          id: uuid(),
          born: null,
        };
        authors = [...authors, newAuthor];
      }
      console.log(authors, isAuthorPresent);
      return book;
    },
    editAuthor: (_, args) => {
      let updatedAuthor = authors.find((a) => a.name === args.name);
      if (updatedAuthor) {
        updatedAuthor = {
          ...updatedAuthor,
          name: args.name,
          born: args.setBornTo,
        };
        authors = authors.map((a) =>
          a.name === args.name ? updatedAuthor : a
        );
        return updatedAuthor;
      }
      return null;
    },
  },
};

module.exports = { resolvers };
