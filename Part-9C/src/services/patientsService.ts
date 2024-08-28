import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatient, Patient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (patientId: string, entry: EntryWithoutId): Patient | undefined => {
  const patient = getPatientById(patientId);
  if (!patient) return undefined;
  const newEntry: Entry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addEntryToPatient
};