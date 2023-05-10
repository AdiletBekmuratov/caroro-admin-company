import { useGetEnginesQuery } from "@/redux/services/engine.service";
import { useGetGearBoxesQuery } from "@/redux/services/gearbox.service";
import { useGetCarBrandsQuery } from "@/redux/services/makes.service";
import { useGetVehicleTypeQuery } from "@/redux/services/vehicleType.service";
import { VehicleSchema, VehiclesFormData } from "@/types/vehicles.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
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

interface CreateModalProps {
  onClose: () => void;
  onSubmit: (values: VehiclesFormData) => void;
  open: boolean;
}

const CreateVehicleModal = ({ open, onClose, onSubmit }: CreateModalProps) => {
  const [images, setImages] = useState([]);
  const { data: gearboxes = [] } = useGetGearBoxesQuery();
  const { data: makes } = useGetCarBrandsQuery();
  const { data: vehicleTypes = [] } = useGetVehicleTypeQuery();
  const { data: engines = [] } = useGetEnginesQuery();

  const selectImage = (event: any) => {
    setImages(event.target.files);
  };

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
      makeId: makes?.data[0]?.id.toString() ?? "",
      model: "",
      plateNumber: "",
      available: false,
      enabled: false,
      lon: "0",
      lat: "0",
      price: "0",
      year: "0",
      description: "",
      vehicleTypeId: vehicleTypes[0]?.id.toString() ?? "",
      gearboxId: gearboxes[0]?.id.toString() ?? "",
      engineId: engines[0]?.id.toString() ?? "",
    },
  });

  const handleFormSubmit = handleSubmit((values) => {
    //put your validation logic here
    let formData = new FormData();
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      formData.append("images", element);
    }

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    onSubmit(formData as unknown as VehiclesFormData);
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
            {/* {JSON.stringify(errors, null, 2)} */}
            <Button variant="contained" component="label">
              {images.length > 0
                ? `Выбрано фото: ${images.length}`
                : "Загрузить фото"}
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={selectImage}
              />
            </Button>
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
            <FormControl fullWidth>
              <InputLabel id="make">Выбери прооизводителя</InputLabel>
              <Controller
                name="makeId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Выбери прооизводителя"
                    labelId="make"
                  >
                    {makes?.data?.map((item) => (
                      <MenuItem
                        key={`make-${item.id}`}
                        value={item.id.toString()}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
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

export default CreateVehicleModal;
