interface OrderResponse {
  orderId: string;
  createdAt: string;
  total: number;
  status: number;
  user: {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    address: string;
    phone: string;
  };
  transaction: any;
}
export default OrderResponse;
