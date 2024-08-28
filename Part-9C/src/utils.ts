import { NewPatientEntry, Gender, EntryWithoutId, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return entry.type === 'HealthCheck' &&
    'date' in entry &&
    'description' in entry &&
    'specialist' in entry &&
    'healthCheckRating' in entry;
};

const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
  return entry.type === 'OccupationalHealthcare' &&
    'date' in entry &&
    'description' in entry &&
    'specialist' in entry &&
    'employerName' in entry;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return entry.type === 'Hospital' &&
    'date' in entry &&
    'description' in entry &&
    'specialist' in entry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const parseEntry = (object: any): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('type' in object)) {
    throw new Error('Incorrect or missing entry type');
  }

  const { type } = object;
  switch (type) {
    case 'HealthCheck':
      if (!isHealthCheckEntry(object)) {
        throw new Error('Invalid HealthCheck entry');
      }
      return {
        ...object,
        healthCheckRating: object.healthCheckRating as HealthCheckRating
      };
    case 'OccupationalHealthcare':
      if (!isOccupationalHealthcareEntry(object)) {
        throw new Error('Invalid OccupationalHealthcare entry');
      }
      return object;
    case 'Hospital':
      if (!isHospitalEntry(object)) {
        throw new Error('Invalid Hospital entry');
      }
      return object;
    default:
      throw new Error('Invalid entry type');
  }
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  const typedObject = object as {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    occupation: unknown;
    gender: unknown;
    entries?: unknown;
  };
  
  if (
    'name' in typedObject &&
    'dateOfBirth' in typedObject &&
    'ssn' in typedObject &&
    'occupation' in typedObject &&
    'gender' in typedObject
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(typedObject.name),
      dateOfBirth: parseDateOfBirth(typedObject.dateOfBirth),
      ssn: parseSsn(typedObject.ssn),
      gender: parseGender(typedObject.gender),
      occupation: parseOccupation(typedObject.occupation),
      entries: Array.isArray(typedObject.entries)
        ? (typedObject.entries as unknown[]).map(parseEntry)
        : []
    };
    return newEntry;
  };
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;