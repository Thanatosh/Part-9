import patientsData from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientsEntry, PatientsEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientsEntry[] = patientsData;

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatients = (): PatientsEntry[] => {
  return patients;
};

const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient
};