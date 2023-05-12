import {
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
} from "@/redux/services/vehicles.service";
import {
  Company,
  Engine,
  GearBox,
  Make,
  VehicleType,
} from "@/types/entity.types";
import { VehiclesFormData } from "@/types/vehicles.types";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import CreateVehicleModal from "./Vehicles/CreateVehicleModal";
import UpdateVehicleModal from "./Vehicles/UpdateVehicleModal";
import { IUser } from "@/types";
import { Vehicle } from "./Vehicles";
import { useGetOrdersQuery } from "@/redux/services/orders.service";

export type OrderStatus = "pending" | "inprogress" | "completed" | "cancelled";

export type Order = {
  id: number;
  orderStatus: OrderStatus;
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
        accessorKey: "orderStatus",
        header: "Order Status",
        size: 140,
      },
      {
        accessorKey: "company.name",
        header: "Company",
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
        editingMode="modal" //default
        enableColumnOrdering
      />
    </>
  );
};

export default Orders;
