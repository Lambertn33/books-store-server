import prisma from "../db";

import { UserInterface } from "../entities";

import { generateToken } from "../helpers/user.helpers";

import { hash, compare } from "bcrypt";

export class UserRepository {
  async createUser(
    username: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> {
    const existingUser = await this.findUserByUsername(username);

    if (existingUser) {
      return { success: false, message: "Username is already taken" };
    }

    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        points: 100,
      },
    });
    return { success: true };
  }

  async findUserByUsername(username: string): Promise<UserInterface | null> {
    return await prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findUserById(userId: number): Promise<UserInterface | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    const user = await this.findUserByUsername(username);
    if (!user) {
      return null;
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return generateToken(user);
  }

  async userProfile(id: number): Promise<UserInterface> {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        orders: true,
      },
    });
    return user!;
  }
}
