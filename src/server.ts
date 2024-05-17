import path from 'path';
import { parse } from 'url';
import dotenv from 'dotenv';
import next from 'next';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
// import { ApolloServer } from 'apollo-server-express';

// import typeDefs from './backend/graphql/typeDefs';
// import resolvers from './backend/graphql/resolvers';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Initialize Next.js
    const nextApp = next({ dev });
    const nextHandler = nextApp.getRequestHandler();

    // Prepare Next.js app
    await nextApp.prepare();

    // Custom Express routes
    app.get('/api/products', (req: Request, res: Response) => {
      // Handle API requests
      res.json({ message: 'API route example' });
    });

    // Apollo Server (if needed)
    // const server = new ApolloServer({ typeDefs, resolvers });
    // await server.start();
    // server.applyMiddleware({ app });

    // Handle all other requests with Next.js
    app.all('*', (req: Request, res: Response) => {
      const parsedUrl = parse(req.url, true);
      return nextHandler(req, res, parsedUrl);
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error('Unknown error:', err);
    }
    process.exit(1);
  }
};

// Connect to the MongoDB database
const dbUri = process.env.DATABASE_URI;
if (!dbUri) {
  console.error('DATABASE_URI is not defined');
  process.exit(1);
}

mongoose.connect(dbUri)
  .then(() => {
    console.log('Connected to the database');
    start();
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
