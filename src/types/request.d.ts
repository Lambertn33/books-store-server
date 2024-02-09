import { Request } from 'express';

interface AuthenticatedUser {
    id: number;
    username: string;
    points: number;
}

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: AuthenticatedUser | null;
    }
  }
}