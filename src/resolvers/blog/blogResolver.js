import { blogs } from '../../mocked-data/blogs-mocked.js'

const blogResolver = {
  Query: {
    blogs: (_, { page, limit }) => {
      const start = (page - 1) * limit;
      return blogs.slice(start, start + limit);
    }
  },
};

export default blogResolver;
