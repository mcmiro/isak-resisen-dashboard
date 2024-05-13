export type RelationModel = {
  id: number;
  name: string;
};

export type OrderModel = {
  id: number;
  date: string;
  client?: RelationModel;
  driver?: RelationModel;
  vehicle?: RelationModel;
  createdBy?: RelationModel;
  updatedBy?: RelationModel;
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
