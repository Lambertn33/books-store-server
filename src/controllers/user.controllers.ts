import { Request, Response } from "express";

import { UserServices } from "../services/user.services";

const userServices = new UserServices();

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const registrationResult = await userServices.registerUser(
      username,
      password
    );

    if (!registrationResult.success) {
      return res.status(400).json({ error: registrationResult.message });
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await userServices.loginUser(username, password);
    return token
      ? res.json({ token })
      : res.status(401).json({ error: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  req.authenticatedUser = null;

  return res.status(200).json({ message: 'Logout successful' });
};

export const userProfile = async(req: Request, res: Response) => {
  const userId = req.authenticatedUser?.id;

  const userProfile = await userServices.userProfile(userId!);

  return res.status(200).json(userProfile);
}
