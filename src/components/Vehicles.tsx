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
import { useAppSelector } from "@/redux/hooks";

export type OtherInfo = {
  description: string;
  label: string;
};

export type Vehicle = {
  id: number;
  company: Company;
  companyId: number;
  vin: string;
  make: Make;
  makeId: number;
  model: string;
  plateNumber: number;
  available: boolean;
  enabled: boolean;
  lon: number;
  lat: number;
  price: number;
  year: number;
  description: string;
  images: { link: string }[];
  vehicleType: VehicleType;
  vehicleTypeId: number;
  gearbox: GearBox;
  gearboxId: number;
  engine: Engine;
  engineId: number;
  createdAt: string;
  updatedAt: string;
};

const Vehicles = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = useGetVehiclesQuery(user!.companyId, { skip: !user });

  const [deleteMutation] = useDeleteVehicleMutation();
  const [createMutation] = useCreateVehicleMutation();
  const [updateMutation] = useUpdateVehicleMutation();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const [row, setRow] = useState<Vehicle>();

  const handleCreateNewRow = (values: VehiclesFormData) => {
    // tableData.push(values);
    // setTableData([...tableData]);
    createMutation(values);
  };

  const handleSaveRowEdits = async (
    values: { id: number } & VehiclesFormData
  ) => {
    updateMutation({ id: values.id, data: values });
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Vehicle>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      // tableData.splice(row.index, 1);
      // setTableData([...tableData]);
      deleteMutation(row.getValue("id"));
    },
    [data]
  );

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Vehicle>
    ): MRT_ColumnDef<Vehicle>["muiTableBodyCellEditTextFieldProps"] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo<MRT_ColumnDef<Vehicle>[]>(
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
        accessorKey: "company.name",
        header: "Company",
        size: 140,
      },
      {
        accessorKey: "vin",
        header: "VIN",
        size: 140,
      },
      {
        accessorKey: "make.name",
        header: "Make",
        size: 140,
      },
      {
        accessorKey: "model",
        header: "Model",
        size: 140,
      },
      {
        accessorKey: "plateNumber",
        header: "PlateNumber",
        size: 140,
      },
      {
        accessorKey: "available",
        header: "Available",
        size: 140,

        Cell: ({ cell: { getValue } }) => getValue<boolean>().toString(),
      },
      {
        accessorKey: "enabled",
        header: "Enabled",
        size: 140,

        Cell: ({ cell: { getValue } }) => getValue<boolean>().toString(),
      },
      {
        accessorKey: "lon",
        header: "Lon",
        size: 140,
      },
      {
        accessorKey: "lat",
        header: "Lat",
        size: 140,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 140,
      },
      {
        accessorKey: "year",
        header: "Year",
        size: 140,
      },

      {
        accessorKey: "description",
        header: "Description",
        size: 140,

        Cell: ({ cell: { getValue } }) =>
          getValue<string>().slice(0, 100) + "...",
      },

      {
        accessorKey: "images",
        header: "Images",
        size: 140,

        Cell: ({ cell: { getValue } }) => (
          <div className="flex flex-col gap-2">
            {getValue<any[]>().map((item) => (
              <a href={item.link} className="text-blue-500" target="_blank">
                {item.link}
              </a>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "vehicleType.name",
        header: "VehicleType",
        size: 140,
      },
      {
        accessorKey: "gearbox.name",
        header: "Gearbox",
        size: 140,
      },
      {
        accessorKey: "engine.name",
        header: "Engine",
        size: 140,
      },
      {
        accessorKey: "createdAt",
        header: "CreatedAt",
        size: 140,
        enableEditing: false,
      },
      {
        accessorKey: "updatedAt",
        header: "UpdatedAt",
        size: 140,
        enableEditing: false,
      },
    ],
    [getCommonEditTextFieldProps]
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
        data={data?.data ?? []}
        editingMode="modal" //default
        enableColumnOrdering
        enableRowActions
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  setRow(row.original);
                  setUpdateModalOpen(true);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Vehicles
          </Button>
        )}
      />
      <CreateVehicleModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      {row && (
        <UpdateVehicleModal
          open={updateModalOpen}
          onSubmit={handleSaveRowEdits}
          data={row!}
          onClose={() => setUpdateModalOpen(false)}
        />
      )}
    </>
  );
};

const validateRequired = (value: string) => !!value.length;

export default Vehicles;
