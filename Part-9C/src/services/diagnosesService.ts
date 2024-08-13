import diagnosesData from '../../data/diagnoses';
import { DiagnosesEntry } from '../types';

const diagnoses: DiagnosesEntry[] = diagnosesData as DiagnosesEntry[];

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};