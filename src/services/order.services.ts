import { OrderRepository } from "../repositories/order.repositories";

const orderRepository = new OrderRepository();

export class OrderServices {
  async getUserOrders(userId: number) {
    return orderRepository.getUserOrders(userId);
  }

  async makeOrder(userId: number, bookIds: number[]) {
    return orderRepository.makeOrder(userId, bookIds);
  }
}
