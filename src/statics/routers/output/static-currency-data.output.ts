import { StaticCurrencyOutput } from './static.currency.output';

export type StaticCurrencyDataOutput = {
  success: boolean;
  message: string;
  data: StaticCurrencyOutput[];
};
