import { StaticFormOutput } from './static.form.output';

export type StaticFormDataOutput = {
  success: boolean;
  message: string;
  data: StaticFormOutput[];
};
