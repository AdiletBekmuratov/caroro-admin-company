import { useGetOrdersQuery } from "@/redux/services/orders.service";
import { IUser } from "@/types";
import { Company } from "@/types/entity.types";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Vehicle } from "./Vehicles";

export type OrderStatus = "pending" | "inprogress" | "completed" | "cancelled";

export type Order = {
  id: number;
  status: OrderStatus;
  finalPrice: number;
  user: IUser;
  userId: number;
  company: Company;
  companyId: number;
  vehicle: Vehicle;
  vehicleId: string;
  createdAt: string;
  finishedAt: string;
};

const Orders = () => {
  const { data = [] } = useGetOrdersQuery();

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: "status",
        header: "Order Status",
        size: 140,
      },
      {
        accessorKey: "finalPrice",
        header: "Final Price",
        size: 140,
      },
      {
        accessorKey: "user.email",
        header: "User",
        size: 140,
      },
      {
        accessorKey: "vehicle.model",
        header: "Vehicle",
        size: 140,
      },
      {
        accessorKey: "createdAt",
        header: "CreatedAt",
        size: 140,
        enableEditing: false,
      },
      {
        accessorKey: "finishedAt",
        header: "FinishedAt",
        size: 140,
        enableEditing: false,
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={data}
        editingMode="modal"
        enableColumnOrdering
      />
    </>
  );
};

export default Orders;
