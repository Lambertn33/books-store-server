import { verify } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  authenticatedUser?: {
    id: number;
    username: string;
    points: number;
  };
}

const testSecretKey = "testSecretKey"; // might change in large projects or production

const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.header("Authorization");
  if (!tokenHeader) return res.status(401).json({ message: "unauthenticated" });

  const token = tokenHeader.split(" ")[1];
  const decodedToken = verify(token, testSecretKey) as any;
  if (!decodedToken)
    return res.status(401).json({ message: "invalid or expired token" });

  req.authenticatedUser = decodedToken?.authUser;
  next();
};

export default checkAuth;
