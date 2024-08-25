import { NewPatientEntry, Gender, EntryWithoutId } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isEntryType = (param: unknown): param is EntryWithoutId['type'] => {
  return param === 'HealthCheck' || param === 'OccupationalHealthcare' || param === 'Hospital';
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

const parseEntry = (entry: unknown): EntryWithoutId => {
  if (!entry || typeof entry !== 'object' || !('type' in entry)) {
    throw new Error('Incorrect or missing entry');
  }
  const { type } = entry as { type: unknown };
  if (!isEntryType(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  return {
    ...entry,
    type
  } as EntryWithoutId;
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