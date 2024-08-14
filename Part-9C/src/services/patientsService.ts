import patientsData from '../../data/patients';
import { NonSensitivePatientsEntry, PatientsEntry } from '../types';

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

export default {
  getPatients,
  getNonSensitiveEntries
};