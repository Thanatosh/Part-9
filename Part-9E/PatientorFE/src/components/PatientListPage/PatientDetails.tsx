import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from '../../services/patients'
import { Patient, Gender } from "../../types";
import { Container, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientService.getById(id as string);
        setPatient(patientData);
      } catch (e: unknown) {
        setError("Failed to fetch patient data");
      }
    };

    void fetchPatient();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <QuestionMarkIcon />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginTop: "20px", marginBottom: "20px" }}>
        {patient.name} {genderIcon()}
      </Typography>
      <Typography><b>Occupation:</b> {patient.occupation}</Typography>
      <Typography><b>Date of Birth:</b> {patient.dateOfBirth}</Typography>
      <Typography><b>SSN:</b> {patient.ssn}</Typography>
    </Container>
  );
};

export default PatientDetails;
