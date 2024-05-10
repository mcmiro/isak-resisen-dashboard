import BreadCrumb from "@/components/breadcrumb";
import { CreateOrder } from "@/components/forms/order-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = [{ title: "Buchung", link: "/dashboard/orders" }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateOrder />
      </div>
    </ScrollArea>
  );
}
