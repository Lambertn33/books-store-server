import { OrderRepository } from "../repositories/order.repositories";

const orderRepository = new OrderRepository();

export class OrderServices {
  async getUserOrders(userId: number) {
    return orderRepository.getUserOrders(userId);
  }
  async getUserOrder(userId: number, orderId: number) {
    return orderRepository.getUserOrder(userId, orderId);
  }

  async makeOrder(userId: number, bookIds: number[]) {
    return orderRepository.makeOrder(userId, bookIds);
  }
}
