import prisma from "@/db";

import { UserInterface } from "@/entities";

import { hash } from "bcrypt";

export class UserRepository {
  async createUser(username: string, password: string): Promise<void> {
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        points: 100,
      },
    });
  }

  async findUserByUsername(username: string): Promise<UserInterface | null> {
    return await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async findUserById(userId: number): Promise<UserInterface | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
