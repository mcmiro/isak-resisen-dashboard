import React, { useEffect, useState, useMemo } from "react";
import useOrder from "@/hooks/use-order";
import { OrderModel } from "@/types/order";
import { VehicleModel } from "@/types/vehicle";
import { getMonth, getYear } from "date-fns";

export interface VehicleMatrixProps {
  orders: OrderModel[];
  vehicles: VehicleModel[];
  date: Date;
}

const VehicleMatrix = ({ orders, vehicles, date }: VehicleMatrixProps) => {
  const [days, setDays] = useState<any>();
  const { handleDailyOrdersWithVehicle } = useOrder();

  //calculate days in month from a given date
  const daysInMonth = (date: Date) => {
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const numberOfDays = new Date(currentYear, currentMonth, 0).getDate();
    const daysArray = Array.from(
      { length: numberOfDays },
      (_, index) => index + 1,
    );

    setDays(daysArray);
  };

  const handleEachDay = (day: number) => {
    const month = getMonth(date) + 1;
    const year = getYear(date);

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    daysInMonth(date);
  }, []);

  const memoizedVehicles = useMemo(() => vehicles, [vehicles]);
  const memoizedDays = useMemo(() => days, [days]);
  const memoizedOrders = useMemo(() => orders, [orders]);

  return (
    <div className="px-4">
      <div className="flex flex-row border dark:border-zinc-600 light:border-zinc-300 rounded-lg overflow-hidden">
        {memoizedVehicles?.length &&
          memoizedVehicles.map((vehicle, v) => (
            <div
              key={v}
              className={`${v === 0 ? "min-w-12" : "w-full"}
                ${v < memoizedVehicles.length - 1 && "border-r"}
              } dark:border-zinc-600 light:border-zinc-300`}
            >
              <div className="flex items-center justify-center h-10 text-xs md:text-sm font-bold">
                {vehicle.name}
              </div>
              {memoizedDays?.length &&
                memoizedDays.map((day: number, d: number) => (
                  <div
                    key={d}
                    className={`${
                      d < memoizedDays.length &&
                      "border-t dark:border-zinc-600 light:border-zinc-300"
                    }`}
                  >
                    {v === 0 ? (
                      <div className="flex items-center justify-center h-8 text-sm">
                        {d + 1}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8">
                        {handleDailyOrdersWithVehicle(
                          memoizedOrders,
                          vehicle,
                          handleEachDay(day),
                        ) ? (
                          <div className="w-6 h-6 rounded-full bg-[#adfa1d]"></div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(VehicleMatrix);
