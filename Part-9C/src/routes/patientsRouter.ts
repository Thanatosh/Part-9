import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
import { parseEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const newPatient = patientsService.addPatient(NewPatientEntry);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }
    
    const newEntry = parseEntry(req.body);
    const updatedPatient = patientsService.addEntryToPatient(patient.id, newEntry);
    if (!updatedPatient) {
      return res.status(500).send({ error: 'Failed to add the new entry to the patient' });
    }
    return res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

export default router;