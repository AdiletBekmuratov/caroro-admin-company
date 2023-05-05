import {
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehiclesQuery,
  useUpdateVehicleMutation,
} from "@/redux/services/vehicles.service";
import {
  Category,
  Company,
  Engine,
  GearBox,
  Make,
  VehicleType,
} from "@/types/entity.types";
import { VehiclesFormData, VehicleSchema } from "@/types/vehicles.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
  otherInfo: OtherInfo[];
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
  const { data } = useGetVehiclesQuery();
  const [deleteMutation] = useDeleteVehicleMutation();
  const [createMutation] = useCreateVehicleMutation();
  const [updateMutation] = useUpdateVehicleMutation();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: VehiclesFormData) => {
    // tableData.push(values);
    // setTableData([...tableData]);
    createMutation(values);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Vehicle>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        // tableData[row.index] = values;
        // //send/receive api updates here, then refetch or update local table data for re-render
        // setTableData([...tableData]);
        updateMutation({ id: row.getValue("id"), data: values });
        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
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
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "vin",
        header: "VIN",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "make.name",
        header: "Make",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "model",
        header: "Model",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "plateNumber",
        header: "PlateNumber",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "available",
        header: "Available",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "enabled",
        header: "Enabled",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "lon",
        header: "Lon",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "lat",
        header: "Lat",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "year",
        header: "Year",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "otherInfo",
        header: "Other info",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ cell }) => (
          <div>
            {cell.getValue<OtherInfo[]>().map((item) => (
              <p>{`${item.label}: ${item.description}`}</p>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },

      {
        accessorKey: "images",
        header: "Images",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "vehicleType.name",
        header: "VehicleType",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "gearbox.name",
        header: "Gearbox",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "engine.name",
        header: "Engine",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
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
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
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
      <CreateNewAccountModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

interface CreateModalProps {
  onClose: () => void;
  onSubmit: (values: VehiclesFormData) => void;
  open: boolean;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VehiclesFormData>({
    mode: "onTouched",
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vin: "",
      makeId: 0,
      model: "",
      plateNumber: 0,
      available: false,
      lon: 0,
      lat: 0,
      price: 0,
      year: 0,
      description: "",
      vehicleTypeId: 0,
      gearboxId: 0,
      engineId: 0,
    },
  });

  const handleFormSubmit = handleSubmit((values) => {
    //put your validation logic here
    onSubmit(values);
    reset();
    onClose();
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Vehicles</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <Controller
              name="vin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="VIN"
                  error={!!errors.vin}
                  helperText={errors.vin?.message}
                />
              )}
            />
            <Controller
              name="makeId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="makeId"
                  error={!!errors.makeId}
                  helperText={errors.makeId?.message}
                />
              )}
            />
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="model"
                  error={!!errors.model}
                  helperText={errors.model?.message}
                />
              )}
            />
            <Controller
              name="plateNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="plateNumber"
                  error={!!errors.plateNumber}
                  helperText={errors.plateNumber?.message}
                />
              )}
            />
            <Controller
              name="available"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Available"
                  control={<Switch {...field} />}
                />
              )}
            />

            <Controller
              name="lon"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="lon"
                  error={!!errors.lon}
                  helperText={errors.lon?.message}
                />
              )}
            />
            <Controller
              name="lat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="lat"
                  error={!!errors.lat}
                  helperText={errors.lat?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="price"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="year"
                  error={!!errors.year}
                  helperText={errors.year?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Описание"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Controller
              name="gearboxId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="gearboxId"
                  error={!!errors.gearboxId}
                  helperText={errors.gearboxId?.message}
                />
              )}
            />
            <Controller
              name="engineId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="engineId"
                  error={!!errors.engineId}
                  helperText={errors.engineId?.message}
                />
              )}
            />
          </Stack>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="secondary" variant="contained" type="submit">
              Create New Vehicles
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;

export default Vehicles;
