import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/services/user.service";
import { UserFormData, UserSchema } from "@/types/users.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type Users = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  enabled: boolean;
  passwordResetToken: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

const Users = () => {
  const { data = [] } = useGetUsersQuery();
  const [deleteMutation] = useDeleteUserMutation();
  const [createMutation] = useCreateUserMutation();
  const [updateMutation] = useUpdateUserMutation();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Users[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: UserFormData) => {
    // tableData.push(values);
    // setTableData([...tableData]);
    createMutation(values);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Users>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        //send/receive api updates here, then refetch or update local table data for re-render
        // setTableData([...tableData]);
        // exitEditingMode(); //required to exit editing mode and close modal
        updateMutation({ id: row.getValue("id"), data: values });
        exitEditingMode();
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Users>) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("firstName")}`)
      ) {
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
      cell: MRT_Cell<Users>
    ): MRT_ColumnDef<Users>["muiTableBodyCellEditTextFieldProps"] => {
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

  const columns = useMemo<MRT_ColumnDef<Users>[]>(
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
        accessorKey: "email",
        header: "Email",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "firstname",
        header: "Firstname",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "lastname",
        header: "Lastname",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "enabled",
        header: "Enabled",
        enableEditing: false,
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
            Create New User
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
  onSubmit: (values: UserFormData) => void;
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
  } = useForm<UserFormData>({
    mode: "onTouched",
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
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
      <DialogTitle textAlign="center">Create New User</DialogTitle>
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
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Пароль"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Имя"
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                />
              )}
            />
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Фамилия"
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Номер телефона"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Stack>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="secondary" variant="contained" type="submit">
              Create New User
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;

export default Users;
