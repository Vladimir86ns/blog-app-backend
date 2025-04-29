const userTypeDefs = `#graphql
  type User {
    email: String!
  }

  type AuthPayload {
    user: User!
  }

  type LogoutResponse {
    message: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: LogoutResponse!
  }
`;

export default userTypeDefs;