import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";

import { Control, Controller, useFieldArray } from "react-hook-form";

import { AutocompleteComponent } from 'layout/common/AutocompleteComponent';
import { ErrorComponent } from "layout/common/ErrorComponent";

import { useUniqueMetrics } from "queries/Metric";
import { CreatePresetConfigForm } from "queries/types/PresetTypes";


type Props = {
  control: Control<CreatePresetConfigForm>;
  handleValidate: (val: string | number) => boolean;
};

export const AddMetric = ({ control, handleValidate }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: "pc_config",
    control
  });
  let metricsOptions: { label: string }[] = [];

  const { data, isSuccess, isLoading, isError, error } = useUniqueMetrics();

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" minHeight={151} maxHeight={151}>
        <ErrorComponent errorMessage={String(error)} />
      </Box>
    );
  }

  if (isSuccess) {
    metricsOptions = data.map(name => ({ label: name }));
  }

  return (
    <Stack spacing={2}>
      {fields.map((arrayField, index) => (
        <Stack direction="row" spacing={1} key={arrayField.id}>
          <Controller
            name={`pc_config.${index}.metric`}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Set metric or delete it"
              },
              validate: handleValidate
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <AutocompleteComponent
                field={{ ...field }}
                label="Metric name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                options={metricsOptions}
                loading={isLoading}
              />
            )}
          />
          <Controller
            name={`pc_config.${index}.update_interval`}
            control={control}
            rules={{
              required: {
                value: true,
                message: "Update interval is required"
              },
              min: {
                value: 10,
                message: "Minimum update interval is 10"
              },
              max: {
                value: 604800,
                message: "Maximum update interval is 604800"
              },
              validate: handleValidate
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Update interval"
                placeholder="10 - 604800"
                type="number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Delete metric">
                        <IconButton
                          color="error"
                          onClick={() => remove(index)}
                          {...(fields.length === 1 && {
                            disabled: true
                          })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Stack>
      ))}
      <Button variant="outlined" onClick={() => append({ metric: "", update_interval: 10 })}>Add metric</Button>
    </Stack>
  );
};