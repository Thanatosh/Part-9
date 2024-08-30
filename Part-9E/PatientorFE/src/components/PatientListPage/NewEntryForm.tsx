import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';
import { Diagnosis, EntryFormValues } from "../../types";
import Autocomplete from '@mui/material/Autocomplete';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnosisCodes: Diagnosis[];
}

const NewEntryForm = ({ onSubmit, diagnosisCodes }: Props) => {
  const [type, setType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case "HealthCheck":
        const rating = parseInt(healthCheckRating);
        if (isNaN(rating) || rating < 0 || rating > 3) {
          setError("Health check rating must be a number between 0 and 3.");
          return;
        }
        setError(null);
        onSubmit({
          type,
          description,
          date,
          specialist,
          healthCheckRating: rating,
          diagnosisCodes: selectedDiagnosisCodes,
        });
        break;
      case "OccupationalHealthcare":
        setError(null);
        onSubmit({
          type,
          description,
          date,
          specialist,
          employerName,
          sickLeave: sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined,
          diagnosisCodes: selectedDiagnosisCodes,
        });
        break;
      case "Hospital":
        setError(null);
        onSubmit({
          type,
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          diagnosisCodes: selectedDiagnosisCodes,
        });
        break;
    }
  };

  return (
    <form onSubmit={addEntry}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FormControl fullWidth>
        <InputLabel id="entry-type-label">Entry Type</InputLabel>
        <Select
          labelId="entry-type-label"
          value={type}
          label="Entry Type"
          onChange={({ target }) => setType(target.value as 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital')}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Description"
        fullWidth
        style={{ marginTop: "8px" }}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        required
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        style={{ marginTop: "8px" }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        label="Specialist"
        fullWidth
        style={{ marginTop: "8px" }}
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        required
      />
      
      {type === 'HealthCheck' && (
        <TextField
          label="Health Check Rating"
          type="number"
          fullWidth
          style={{ marginTop: "8px" }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
          inputProps={{ min: 0, max: 3 }}
          required
        />
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            style={{ marginTop: "8px" }}
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            required
          />
          <TextField
            label="Sick Leave Start Date"
            type="date"
            fullWidth
            style={{ marginTop: "8px" }}
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Sick Leave End Date"
            type="date"
            fullWidth
            style={{ marginTop: "8px" }}
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </>
      )}

      {type === 'Hospital' && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            fullWidth
            style={{ marginTop: "8px" }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            style={{ marginTop: "8px" }}
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            required
          />
        </>
      )}

      <Autocomplete
        multiple
        options={diagnosisCodes}
        getOptionLabel={(option) => `${option.code}: ${option.name}`}
        onChange={(_, newValue) => setSelectedDiagnosisCodes(newValue.map(code => code.code))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Diagnosis Codes"
            placeholder="Select Diagnosis Codes"
            fullWidth
            style={{ marginTop: "8px", marginBottom: "8px" }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.code}
              {...getTagProps({ index })}
              key={option.code}
            />
          ))
        }
      />
      <Grid>
        <Grid item>
          <Button
            style={{ float: "left", marginBottom: "20px" }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewEntryForm;