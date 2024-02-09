import { JwtPayload, verify } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const testSecretKey = "testSecretKey"; // might change in large projects or production

const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader = req.header("Authorization");
  if (!tokenHeader) return res.status(401).json({ message: "unauthenticated" });

  const token = tokenHeader.split(" ")[1];
  const decodedToken = verify(token, testSecretKey) as JwtPayload;
  if (!decodedToken)
    return res.status(401).json({ message: "invalid or expired token" });

  req.authenticatedUser = decodedToken?.authUser;
  next();
};

export default checkAuth;
