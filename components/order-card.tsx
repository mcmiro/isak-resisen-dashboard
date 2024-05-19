"use client";
import React, { useEffect, useState } from "react";
import { OrderModel } from "@/types/order";
import { VehicleModel } from "@/types/vehicle";
import useOrder from "@/hooks/use-order";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface OrderCardProps {
  vehicles?: VehicleModel[];
}

const OrderCard = ({ vehicles }: OrderCardProps) => {
  const { handleCurrentMonthOrders, getOrders, orders } = useOrder();

  const [groupedOrders, setGroupedorders] = useState<any>();
  const [currentOrders, setCurrentOrders] = useState<OrderModel[]>();
  const [selectedVehicle, setSelectedVehicle] = useState<
    VehicleModel | undefined
  >();

  function groupOrdersByDate(orders: OrderModel[]) {
    const groupedOrders: any = {};
    const filteredOrders = selectedVehicle
      ? orders.filter((order) => order.vehicle?.id === selectedVehicle?.id)
      : orders;
    filteredOrders.forEach((order) => {
      const date = order.date;
      if (groupedOrders[date]) {
        groupedOrders[date].push(order);
      } else {
        groupedOrders[date] = [order];
      }
    });
    return groupedOrders;
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    orders?.length && setCurrentOrders(handleCurrentMonthOrders(orders));
  }, [orders]);

  useEffect(() => {
    currentOrders?.length && setGroupedorders(groupOrdersByDate(currentOrders));
  }, [currentOrders, selectedVehicle]);

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 mb-4">
          {vehicles?.length &&
            vehicles.map((vehicle, index) => (
              <Button
                key={index}
                variant={
                  selectedVehicle?.id === vehicle.id ? "default" : "secondary"
                }
                onClick={() => setSelectedVehicle(vehicle)}
                className="whitespace-nowrap"
              >
                {vehicle.name}
              </Button>
            ))}
        </div>
      </div>
      {Object.keys(groupedOrders).length > 0 ? (
        Object.keys(groupedOrders).map((date) => (
          <div key={date}>
            <div
              key={date.toString()}
              className="border dark:border-neutral-50 border-neutral-200 rounded-md mb-4 overflow-hidden"
            >
              <div className="bg-neutral-50 flex justify-between items-center text-zinc-900 font-semibold px-4 py-2 border-b dark:border-neutral-50 border-neutral-200">
                <span>
                  {format(new Date(date), "dd.MM.yyyy", { locale: de })}
                </span>
              </div>
              <ul>
                {groupedOrders[date].map((order: OrderModel, index: number) => (
                  <div
                    key={index}
                    className="divide-y divide-solid dark:divide-neutral-50 divide-neutral-200"
                  >
                    <div
                      className={`flex flex-col divide-y divide-solid dark:divide-zinc-800 p-4 ${
                        index < groupedOrders[date].length - 1
                          ? "border-b-2 border-dashed dark:border-neutral-50 border-neutral-200 pb-8"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center pb-4">
                        <div className="flex flex-col gap-1 items-center">
                          <span className="font-bold md:text-lg">
                            {order.startTime}
                          </span>
                          <span className="text-sm md:text-base">
                            {order.startLocation}
                          </span>
                        </div>

                        <svg
                          className="h-4 w-4 md:h-8 md:w-8"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 1L19 5M19 5L15 9M19 5H1"
                            stroke="#A1A1AA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M5 17L1 13M1 13L5 9M1 13L19 13"
                            stroke="#A1A1AA"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>

                        <div className="flex flex-col gap-1 items-center">
                          <span className="font-bold md:text-lg">
                            {order.endTime}
                          </span>
                          <span className="text-sm md:text-base">
                            {order.endLocation}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center py-4">
                        <div className="flex gap-1 items-center text-xs">
                          <svg
                            className="h-4 w-4 md:h-6 md:w-6"
                            viewBox="0 0 11 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.55553 6.33333V3.66667C8.55553 2.40959 8.55553 1.78105 8.16501 1.39052C7.77449 1 7.14595 1 5.88887 1H4.99998C3.7429 1 3.11436 1 2.72384 1.39052C2.33331 1.78105 2.33331 2.40959 2.33331 3.66667V6.33333C2.33331 7.59041 2.33331 8.21895 2.72384 8.60948C3.11436 9 3.7429 9 4.99998 9H5.88887C7.14595 9 7.77449 9 8.16501 8.60948C8.55553 8.21895 8.55553 7.59041 8.55553 6.33333Z"
                              stroke="#A1A1AA"
                              strokeWidth="0.8"
                            ></path>
                            <path
                              d="M4.37337 5.99582L4.15075 5.66349H4.15075L4.37337 5.99582ZM6.51556 5.99582L6.73818 5.66349H6.73818L6.51556 5.99582ZM3.80746 7.04359L3.51499 7.31647H3.51499L3.80746 7.04359ZM7.08147 7.04359L6.789 6.77071H6.789L7.08147 7.04359ZM4.59599 6.32815C5.11662 5.97939 5.77231 5.97939 6.29294 6.32815L6.73818 5.66349C5.94815 5.13427 4.94078 5.13427 4.15075 5.66349L4.59599 6.32815ZM4.57353 7.84436H6.3154V7.04435H4.57353V7.84436ZM4.09993 6.77071C4.04744 6.71445 4.06969 6.70962 4.06643 6.74309C4.06495 6.75833 4.06133 6.73787 4.11438 6.67945C4.16499 6.62372 4.23952 6.56385 4.33131 6.50058C4.3758 6.46991 4.42076 6.44084 4.46572 6.41214C4.50802 6.38514 4.5562 6.3548 4.59599 6.32815L4.15075 5.66349C4.05371 5.72849 3.72804 5.91489 3.52214 6.14162C3.41287 6.26196 3.29227 6.43844 3.27018 6.66573C3.24633 6.91125 3.34434 7.13357 3.51499 7.31647L4.09993 6.77071ZM6.29294 6.32815C6.33273 6.3548 6.38091 6.38514 6.42321 6.41214C6.46817 6.44084 6.51313 6.46991 6.55762 6.50058C6.64941 6.56385 6.72394 6.62372 6.77455 6.67945C6.8276 6.73787 6.82398 6.75833 6.8225 6.74309C6.81924 6.70962 6.84149 6.71445 6.789 6.77071L7.37394 7.31647C7.54459 7.13357 7.6426 6.91125 7.61875 6.66573C7.59666 6.43844 7.47606 6.26196 7.36679 6.14162C7.16089 5.91489 6.83521 5.72849 6.73818 5.66349L6.29294 6.32815ZM6.789 6.77071C6.60119 6.97201 6.45722 7.04435 6.3154 7.04435V7.84436C6.78411 7.84436 7.12574 7.58248 7.37394 7.31647L6.789 6.77071ZM3.51499 7.31647C3.76319 7.58249 4.10482 7.84436 4.57353 7.84436V7.04435C4.43171 7.04435 4.28774 6.97201 4.09993 6.77071L3.51499 7.31647ZM5.93335 3.44435C5.93335 3.71436 5.71447 3.93324 5.44446 3.93324V4.73324C6.1563 4.73324 6.73335 4.15619 6.73335 3.44435H5.93335ZM5.44446 3.93324C5.17446 3.93324 4.95558 3.71436 4.95558 3.44435H4.15558C4.15558 4.15619 4.73263 4.73324 5.44446 4.73324V3.93324ZM4.95558 3.44435C4.95558 3.17435 5.17446 2.95547 5.44446 2.95547V2.15547C4.73263 2.15547 4.15558 2.73252 4.15558 3.44435H4.95558ZM5.44446 2.95547C5.71447 2.95547 5.93335 3.17435 5.93335 3.44435H6.73335C6.73335 2.73252 6.1563 2.15547 5.44446 2.15547V2.95547Z"
                              fill="#A1A1AA"
                            ></path>
                            <path
                              d="M9.88885 2.77812V7.22257"
                              stroke="#A1A1AA"
                              strokeWidth="0.8"
                              strokeLinecap="round"
                            ></path>
                            <path
                              d="M1 2.77812V7.22257"
                              stroke="#A1A1AA"
                              strokeWidth="0.8"
                              strokeLinecap="round"
                            ></path>
                          </svg>
                          <span className="text-zinc-400 md:text-base">
                            {order.client?.name}
                          </span>
                        </div>

                        <div className="flex gap-1 items-center text-xs">
                          <svg
                            className="h-4 w-4 md:h-6 md:w-6"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.89122 8.55511L3.69204 8.20822V8.20822L3.89122 8.55511ZM8.10866 8.55511L8.30783 8.20822V8.20822L8.10866 8.55511ZM2.77709 10.3232L2.50647 10.6178L2.50647 10.6178L2.77709 10.3232ZM9.22279 10.3232L8.95218 10.0287V10.0287L9.22279 10.3232ZM4.09039 8.90199C5.25723 8.23202 6.74264 8.23202 7.90949 8.90199L8.30783 8.20822C6.89431 7.39661 5.10557 7.39661 3.69204 8.20822L4.09039 8.90199ZM4.28528 11.3995H7.7146V10.5995H4.28528V11.3995ZM3.0477 10.0287C2.88893 9.88281 2.89912 9.80887 2.90059 9.79591C2.90512 9.75589 2.93949 9.67176 3.07291 9.54583C3.34691 9.28721 3.77184 9.08489 4.09039 8.90199L3.69204 8.20822C3.4604 8.34122 2.88896 8.61938 2.52379 8.96405C2.33763 9.13976 2.1417 9.38798 2.10568 9.7058C2.06658 10.0507 2.22593 10.3601 2.50647 10.6178L3.0477 10.0287ZM7.90949 8.90199C8.22803 9.08489 8.65297 9.28721 8.92697 9.54583C9.06039 9.67176 9.09475 9.75589 9.09929 9.79591C9.10076 9.80887 9.11094 9.88281 8.95218 10.0287L9.4934 10.6178C9.77395 10.3601 9.93329 10.0507 9.8942 9.7058C9.85817 9.38798 9.66225 9.13976 9.47609 8.96405C9.11091 8.61938 8.53947 8.34122 8.30783 8.20822L7.90949 8.90199ZM8.95218 10.0287C8.56066 10.3883 8.17522 10.5995 7.7146 10.5995V11.3995C8.45594 11.3995 9.02653 11.0467 9.4934 10.6178L8.95218 10.0287ZM2.50647 10.6178C2.97334 11.0467 3.54393 11.3995 4.28528 11.3995V10.5995C3.82466 10.5995 3.43922 10.3883 3.0477 10.0287L2.50647 10.6178Z"
                              fill="#A1A1AA"
                            ></path>
                            <path
                              d="M7.74997 4.99976C7.74997 5.96625 6.96647 6.74976 5.99997 6.74976C5.03347 6.74976 4.24997 5.96625 4.24997 4.99976C4.24997 4.03326 5.03347 3.24976 5.99997 3.24976C6.96647 3.24976 7.74997 4.03326 7.74997 4.99976Z"
                              stroke="#A1A1AA"
                              strokeWidth="0.8"
                            ></path>
                            <path
                              d="M1.06156 8.16263C1.15138 8.36446 1.38781 8.45527 1.58964 8.36545C1.79147 8.27563 1.88227 8.0392 1.79245 7.83737L1.06156 8.16263ZM10.2076 7.83737C10.1177 8.0392 10.2085 8.27563 10.4104 8.36545C10.6122 8.45527 10.8486 8.36446 10.9384 8.16263L10.2076 7.83737ZM1.4 5.98228C1.4 3.45289 3.45815 1.4 6 1.4V0.6C3.019 0.6 0.6 3.00839 0.6 5.98228H1.4ZM6 1.4C8.54185 1.4 10.6 3.45289 10.6 5.98228H11.4C11.4 3.00839 8.981 0.6 6 0.6V1.4ZM1.79245 7.83737C1.54028 7.27073 1.4 6.64334 1.4 5.98228H0.6C0.6 6.75762 0.764729 7.49565 1.06156 8.16263L1.79245 7.83737ZM10.6 5.98228C10.6 6.64334 10.4597 7.27073 10.2076 7.83737L10.9384 8.16263C11.2353 7.49565 11.4 6.75762 11.4 5.98228H10.6Z"
                              fill="#A1A1AA"
                            ></path>
                          </svg>

                          <span className="text-zinc-400 md:text-base">
                            {order.driver?.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <span
                          className={`inline-flex items-center rounded-full py-1 md:py-1 px-1.5 md:px-2.5 text-[8px] md:text-sm font-semibold  ${
                            order.invoiceStatus !== "Bezahlt"
                              ? "border border-red-300 bg-red-50 text-red-500"
                              : "border border-cyan-300 bg-cyan-50 text-cyan-500"
                          }`}
                        >
                          {order.invoiceNumber
                            ? order.invoiceNumber
                            : "Keine Rechnung"}
                        </span>

                        <div className="flex gap-1 items-center text-[8px]">
                          <svg
                            className="h-3 w-3 md:h-4 md:w-4"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_160_1760)">
                              <path
                                d="M7 9C9.20914 9 11 7.20914 11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5C3 7.20914 4.79086 9 7 9Z"
                                stroke="#A1A1AA"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M1.57828 5.5C1.21261 6.05878 1 6.72677 1 7.44442C1 9.40811 2.59189 11 4.55558 11C5.27323 11 5.94122 10.7874 6.5 10.4217"
                                stroke="#A1A1AA"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                              ></path>
                              <path
                                d="M8.5 6.24613C8.26082 6.69787 7.82561 7 7.3284 7C6.5735 7 5.96154 6.30355 5.96154 5.44444V4.55556C5.96154 3.69645 6.5735 3 7.3284 3C7.82561 3 8.26082 3.30213 8.5 3.75387M5.5 5H7.46154"
                                stroke="#A1A1AA"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_160_1760">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                          <span className="text-zinc-400 md:text-base">
                            {order.price} ({order.paymentOption})
                          </span>
                        </div>

                        <div className="flex gap-1 items-center text-[8px] md:text-sm">
                          <svg
                            className="h-3 w-3 md:h-4 md:w-4"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_160_1764)">
                              <path
                                d="M4.56718 1.25C3.23404 1.28038 2.45537 1.40728 1.92334 1.93746C1.4577 2.40149 1.30205 3.05378 1.25002 4.1M7.43285 1.25C8.76599 1.28038 9.54466 1.40728 10.0767 1.93746C10.5423 2.40149 10.698 3.05378 10.75 4.1M7.43285 10.75C8.76599 10.7196 9.54466 10.5927 10.0767 10.0625C10.5423 9.59851 10.698 8.94622 10.75 7.9M4.56718 10.75C3.23404 10.7196 2.45537 10.5927 1.92334 10.0625C1.4577 9.59851 1.30205 8.94622 1.25002 7.9"
                                stroke="#A1A1AA"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M3.75002 8.5C4.91587 7.27891 7.07163 7.22142 8.25002 8.5M7.24756 4.75C7.24756 5.44036 6.68712 6 5.99578 6C5.30444 6 4.744 5.44036 4.744 4.75C4.744 4.05964 5.30444 3.5 5.99578 3.5C6.68712 3.5 7.24756 4.05964 7.24756 4.75Z"
                                stroke="#A1A1AA"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_160_1764">
                                <rect
                                  width="12"
                                  height="12"
                                  fill="white"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                          <span className="text-zinc-400 md:text-base">
                            {!order.updatedBy?.name && order.createdBy?.name}
                            {order.updatedBy?.name}
                          </span>
                        </div>

                        <div className="flex gap-1 items-center text-[8px] md:text-sm">
                          <Link href={`/dashboard/orders/${order.id}`}>
                            <svg
                              className="h-4 w-4 md:h-6 md:w-6"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.4106 4.48679L12.4619 3.43547C13.0425 2.85484 13.9839 2.85484 14.5645 3.43547C15.1452 4.0161 15.1452 4.95748 14.5645 5.53811L13.5132 6.58943M11.4106 4.48679L5.23517 10.6622C4.45119 11.4462 4.0592 11.8382 3.79228 12.3158C3.52536 12.7935 3.2568 13.9214 3 15C4.07856 14.7432 5.20649 14.4746 5.68417 14.2077C6.16184 13.9408 6.55383 13.5488 7.33781 12.7648L13.5132 6.58943M11.4106 4.48679L13.5132 6.58943"
                                stroke="#A1A1AA"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M8.25 15H12.75"
                                stroke="#A1A1AA"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 className="font-bold text-xl">Keine Ergebnisse</h2>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
