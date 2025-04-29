import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import resolvers from './src/resolvers/index.js';
import typeDefs from './src/schemas/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { authContext } from './src/middleware/authContext.js';
dotenv.config();
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use('/graphql', expressMiddleware(server, {
  context: authContext
}));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
