import {
  useGetCarBrandsQuery,
  useUpdateCarBrandsMutation,
} from "@/redux/services/makes.service";
import { Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MaterialReactTableProps,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";

export type Make = {
  id: number;
  slug: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const Make = () => {
  const { data } = useGetCarBrandsQuery();
  const [updateMutation] = useUpdateCarBrandsMutation();
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleSaveRowEdits: MaterialReactTableProps<Make>["onEditingRowSave"] =
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

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<Make>
    ): MRT_ColumnDef<Make>["muiTableBodyCellEditTextFieldProps"] => {
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

  const columns = useMemo<MRT_ColumnDef<Make>[]>(
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
        accessorKey: "image",
        header: "Image",
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
          </Box>
        )}
      />
    </>
  );
};

const validateRequired = (value: string) => !!value.length;

export default Make;
