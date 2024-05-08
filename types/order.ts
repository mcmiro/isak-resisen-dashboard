export type OrderModel = {
  date: string;
  vehicle?: number;
  driver?: string;
  client?: string;
  startTime?: string;
  endTime?: string;
  startLocation?: string;
  endLocation?: string;
  paymentOption?: string;
  price?: number;
  invoiceNumber?: string;
  invoiceStatus?: string;
  message?: string;
};
