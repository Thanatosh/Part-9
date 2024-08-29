import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const NewEntryForm = ({ onSubmit }: Props) => {
  const [type, setType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case "HealthCheck":
        onSubmit({
          type,
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes,
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type,
          description,
          date,
          specialist,
          employerName,
          sickLeave: sickLeaveStartDate && sickLeaveEndDate ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } : undefined,
          diagnosisCodes,
        });
        break;
      case "Hospital":
        onSubmit({
          type,
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          diagnosisCodes,
        });
        break;
    }
  };

  return (
    <form onSubmit={addEntry}>
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
      />
      <TextField
        label="Date"
        fullWidth
        style={{ marginTop: "8px" }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        style={{ marginTop: "8px" }}
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      
      {type === 'HealthCheck' && (
        <TextField
          label="Health Check Rating"
          type="number"
          fullWidth
          style={{ marginTop: "8px" }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
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
          />
          <TextField
            label="Sick Leave Start Date"
            fullWidth
            style={{ marginTop: "8px" }}
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            label="Sick Leave End Date"
            fullWidth
            style={{ marginTop: "8px" }}
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
        </>
      )}

      {type === 'Hospital' && (
        <>
          <TextField
            label="Discharge Date"
            fullWidth
            style={{ marginTop: "8px" }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            style={{ marginTop: "8px" }}
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}

      <TextField
        label="Diagnosis Codes (comma separated)"
        fullWidth
        style={{ marginTop: "8px", marginBottom: "8px" }}
        value={diagnosisCodes.join(',')}
        onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
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