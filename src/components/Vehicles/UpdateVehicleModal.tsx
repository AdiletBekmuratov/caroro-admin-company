import { useGetEnginesQuery } from "@/redux/services/engine.service";
import { useGetGearBoxesQuery } from "@/redux/services/gearbox.service";
import { useGetCarBrandsQuery } from "@/redux/services/makes.service";
import { useGetVehicleTypeQuery } from "@/redux/services/vehicleType.service";
import { VehicleSchema, VehiclesFormData } from "@/types/vehicles.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Vehicle } from "../Vehicles";

interface UpdateModalProps {
  onClose: () => void;
  onSubmit: (values: { id: number } & VehiclesFormData) => void;
  open: boolean;
  data: Vehicle;
}

const UpdateVehicleModal = ({
  open,
  onClose,
  onSubmit,
  data,
}: UpdateModalProps) => {
  const { data: gearboxes = [] } = useGetGearBoxesQuery();
  const { data: makes } = useGetCarBrandsQuery();
  const { data: vehicleTypes = [] } = useGetVehicleTypeQuery();
  const { data: engines = [] } = useGetEnginesQuery();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VehiclesFormData>({
    mode: "onTouched",
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      vin: data.vin,
      makeId: data.makeId.toString(),
      model: data.model,
      plateNumber: data.plateNumber.toString(),
      available: data.available,
      enabled: data.enabled,
      lon: data.lon.toString(),
      lat: data.lat.toString(),
      price: data.price.toString(),
      year: data.year.toString(),
      description: data.description,
      vehicleTypeId: data.vehicleTypeId.toString(),
      gearboxId: data.gearboxId.toString(),
      engineId: data.engineId.toString(),
    },
  });

  const handleFormSubmit = handleSubmit((values) => {
    onSubmit({ id: data.id, ...values });
    reset();
    onClose();
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Update Vehicle</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleFormSubmit} noValidate>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {JSON.stringify(errors, null, 2)}
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
              render={({ field, formState }) => (
                <Autocomplete
                  value={makes?.data.find(
                    (item) => item.id.toString() === field.value
                  )}
                  onChange={(event, data) =>
                    field.onChange(data?.id.toString())
                  }
                  getOptionLabel={(option) => option.name}
                  options={makes?.data ?? []}
                  renderInput={(params) => (
                    <TextField {...params} label="Выбери прооизводителя" />
                  )}
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
                  label="Модель машины"
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
                  label="Номер Машины"
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
                  label="Доступно"
                  control={<Switch {...field} />}
                />
              )}
            />
            <Controller
              name="enabled"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Опубликован"
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
                  label="Цена"
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
                  label="Год выпуска"
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
                <FormControl fullWidth>
                  <InputLabel id="gearbox">Выбери КПП</InputLabel>
                  <Select {...field} label="Выбери КПП" labelId="gearbox">
                    {gearboxes?.map((item) => (
                      <MenuItem
                        key={`gearbox-${item.id}`}
                        value={item.id.toString()}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="vehicleTypeId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="vehicleType">Выбери тип кузова</InputLabel>
                  <Select
                    {...field}
                    label="Выбери тип кузова"
                    labelId="vehicleType"
                  >
                    {vehicleTypes?.map((item) => (
                      <MenuItem
                        key={`vehicleType-${item.id}`}
                        value={item.id.toString()}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="engineId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="engine">Выбери тип двигателя</InputLabel>
                  <Select
                    {...field}
                    label="Выбери тип двигателя"
                    labelId="engine"
                  >
                    {engines?.map((item) => (
                      <MenuItem
                        key={`engine-${item.id}`}
                        value={item.id.toString()}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="secondary" variant="contained" type="submit">
              Update Vehicle
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateVehicleModal;
