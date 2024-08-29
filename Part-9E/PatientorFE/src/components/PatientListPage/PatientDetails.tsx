import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from '../../services/patients'
import diagnosisService from "../../services/diagnoses";
import { Patient, Gender, Entry, Diagnosis, EntryFormValues } from "../../types";
import { Container, Typography, Button } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);

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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnosisData = await diagnosisService.getAll();
        setDiagnoses(diagnosisData);
      } catch (e: unknown) {
        setError("Failed to fetch diagnosis data");
      }
    };

    fetchDiagnoses();
  }, []);

  const getDiagnosisName = (code: string): string | undefined => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) return;
    try {
      const updatedPatient = await patientService.addEntry(patient.id, values);
      setPatient(updatedPatient);
      setShowForm(false);
    } catch (e: unknown) {
      console.error(e);
      setError("Failed to add entry");
    }
  };

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
      <Typography variant="h5" style={{ marginTop: "20px" }}>Entries</Typography>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id} style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <EntryDetails entry={entry} />
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}: {getDiagnosisName(code) || 'Unknown diagnosis'}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        style={{ marginTop: "20px", marginBottom: "20px" }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add New Entry"}
      </Button>
      {showForm && (
        <NewEntryForm
          onCancel={() => setShowForm(false)}
          onSubmit={submitNewEntry}
        />
      )}
    </Container>
  );
};

export default PatientDetails;
