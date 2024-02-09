import jwt from "jsonwebtoken";

import { UserInterface } from "@/entities";

export function generateToken(user: UserInterface) {
  const testSecretKey = "testSecretKey"; // might change in large projects or production

  return jwt.sign(
    {
      authUser: {
        id: user.id,
        username: user.username,
        points: user.points,
      },
    },
    testSecretKey,
    { expiresIn: "1h" }
  );
}
