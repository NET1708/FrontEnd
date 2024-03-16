class Order {
  order_id!: number;
  createdAt: Date = new Date();
  total!: number;
  status?: boolean;
}
export default Order;
