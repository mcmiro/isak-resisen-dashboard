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
  price?: string;
  invoiceNumber?: string;
  invoiceStatus?: string;
  message?: string;
};

type RelationModel = {
  id: number;
  name: string;
};

export interface OrderModelWithId
  extends Omit<OrderModel, "vehicle" | "client" | "driver"> {
  id: number;
  client?: RelationModel;
  driver?: RelationModel;
  vehicle?: RelationModel;
}
