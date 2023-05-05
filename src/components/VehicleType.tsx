import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "@/redux/services/category.service";
import { useCreateVehicleTypeMutation, useDeleteVehicleTypeMutation, useGetVehicleTypeQuery, useUpdateVehicleTypeMutation } from "@/redux/services/vehicleType.service";
import { CategoryFormData, CategorySchema } from "@/types/category.types";
import { VehicleTypeFormData, VehicleTypeSchema } from "@/types/vehicleType.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTableProps,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export type VehicleType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const VehicleType = () => {
  const { data = [] } = useGetVehicleTypeQuery();
  const [deleteMutation] = useDeleteVehicleTypeMutation();
  const [createMutation] = useCreateVehicleTypeMutation();
  const [updateMutation] = useUpdateVehicleTypeMutation();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: VehicleTypeFormData) => {
    // tableData.push(values);
    // setTableData([...tableData]);
    createMutation(values);
  };

  const handleSaveRowEdits: MaterialReactTableProps<VehicleType>["onEditingRowSave"] =
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
    (row: MRT_Row<VehicleType>) => {
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
      cell: MRT_Cell<VehicleType>
    ): MRT_ColumnDef<VehicleType>["muiTableBodyCellEditTextFieldProps"] => {
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

  const columns = useMemo<MRT_ColumnDef<VehicleType>[]>(
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
        accessorKey: "name",
        header: "Name",
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
        data={data}
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
            Create New VehicleType
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
  onSubmit: (values: VehicleTypeFormData) => void;
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
  } = useForm<VehicleTypeFormData>({
    mode: "onTouched",
    resolver: zodResolver(VehicleTypeSchema),
    defaultValues: {
      name: ""
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
      <DialogTitle textAlign="center">Create New VehicleType</DialogTitle>
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
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Название"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Stack>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="secondary" variant="contained" type="submit">
              Create New VehicleType
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;

export default VehicleType;
