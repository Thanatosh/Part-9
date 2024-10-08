export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
  entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface Discharge {
  date: string,
  criteria: string
}

interface SickLeave {
  startDate: string,
  endDate: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave
}

interface HospitalEntry extends BaseEntry{
  type: "Hospital",
  discharge?: Discharge
}

export type EntryFormValues =
  | {
      type: "HealthCheck";
      description: string;
      date: string;
      specialist: string;
      healthCheckRating: number;
      diagnosisCodes?: string[];
    }
  | {
      type: "OccupationalHealthcare";
      description: string;
      date: string;
      specialist: string;
      employerName: string;
      sickLeave?: {
        startDate: string;
        endDate: string;
      };
      diagnosisCodes?: string[];
    }
  | {
      type: "Hospital";
      description: string;
      date: string;
      specialist: string;
      discharge: {
        date: string;
        criteria: string;
      };
      diagnosisCodes?: string[];
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id' | 'entries'> & { entries: EntryWithoutId[] };
export type PatientFormValues = Omit<Patient, "id" | "entries">;