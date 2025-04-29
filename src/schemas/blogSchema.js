  const blogTypeDefs = `#graphql
    type Blog {
        id: ID!
        title: String!
        description: String!
        imageUrl: String!
    }

    type Query {
        blogs(page: Int!, limit: Int!): [Blog]
    }
`;

export default blogTypeDefs;