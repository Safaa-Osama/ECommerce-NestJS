export enum OrderStatus {
  pending = 'pending',
  shipped = 'shipped',
  delivered = 'delivered',
  cancelled = 'cancelled',
}

export enum PaymentMethod {
  cash = 'cash',
  card = 'card',
}

export enum PaymentStatus {
  pending = 'pending',
  paid = 'paid',
  refunded = 'refunded',
  unpaid = 'unpaid',
}
