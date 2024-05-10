import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { handleGermanDate, handleGermanSummary } from "@/lib/parse-data-german";
import { OrderModelWithId } from "@/types/order";

export type RecentSalesProps = {
  orders: OrderModelWithId[];
};

export function RecentSales({ orders }: RecentSalesProps) {
  return (
    <div className="divide-y">
      {orders &&
        orders.map((el: OrderModelWithId, index: number) => {
          return (
            <div key={index} className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  {el.client !== null && (
                    <AvatarFallback>
                      {el?.client?.name.split("")[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-4 space-y-1">
                  {el.client !== null && (
                    <p className="text-sm font-medium leading-none">
                      {el?.client?.name}
                    </p>
                  )}
                  {el.driver !== null && (
                    <p className="text-sm text-muted-foreground">
                      {el?.driver?.name}{" "}
                      <span className="text-xs">(Fahrer)</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end">
                {el.startTime && (
                  <div className="font-medium">{el.startTime}</div>
                )}
                {el.date && (
                  <div className="text-xs">{handleGermanDate(el.date)}</div>
                )}
              </div>
              <div className="flex flex-col items-end">
                {el.price && (
                  <div className="font-medium">
                    {handleGermanSummary.format(parseInt(el.price))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
