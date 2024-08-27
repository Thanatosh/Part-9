import { Entry, HealthCheckRating } from '../../types';
import { Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return null;
  }
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <Typography variant="h6"><b>Health Check</b> <MedicalServicesIcon /></Typography>
          <Typography><b>Date:</b> {entry.date}</Typography>
          <Typography><b>Description:</b> {entry.description}</Typography>
          <Typography><b>Diagnose by:</b> {entry.specialist}</Typography>
          <HealthCheckRatingIcon rating={entry.healthCheckRating} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <Typography variant="h6"><b>Occupational Healthcare</b> <WorkIcon /></Typography>
          <Typography><b>Date:</b> {entry.date}</Typography>
          <Typography><b>Description:</b> {entry.description}</Typography>
          <Typography><b>Employer:</b> {entry.employerName}</Typography>
          <Typography><b>Diagnose by:</b> {entry.specialist}</Typography>
          {entry.sickLeave && (
            <Typography>
              <b>Sick Leave:</b> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>
          )}
        </div>
      );
    case "Hospital":
      return (
        <div>
          <Typography variant="h6"><b>Hospital</b> <LocalHospitalIcon /></Typography>
          <Typography><b>Date:</b> {entry.date}</Typography>
          <Typography><b>Description:</b> {entry.description}</Typography>
          <Typography><b>Diagnose by:</b> {entry.specialist}</Typography>
          {entry.discharge && (
            <Typography>
              <b>Discharge:</b> {entry.discharge.date} - {entry.discharge.criteria}
            </Typography>
          )}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;