import { UserInterface } from "@/entities";
import { UserRepository } from "../repositories/user.repositories";

const userRepository = new UserRepository();

export class UserServices {
  async registerUser(username: string, password: string): Promise<{ success: boolean, message?: string }> {
    return userRepository.createUser(username, password);
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    return userRepository.loginUser(username, password);
  }
  
  async userProfile(id: number): Promise<UserInterface | null> {
    return userRepository.userProfile(id);
  }
}
