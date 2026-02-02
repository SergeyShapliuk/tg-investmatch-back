import { Currency } from '../../domain/static.currency.model';
import { StaticCurrencyDataOutput } from '../output/static-currency-data.output';
import { StaticCurrencyOutput } from '../output/static.currency.output';


export function mapToStaticCurrenciesOutputUtil(currencies: Currency[]): StaticCurrencyDataOutput {
  const data: StaticCurrencyOutput[] = currencies?.length ? currencies.map(currency => ({
    id: currency.id,
    currency: currency.currency,
  })) : [];
  return {
    success: !!data.length,
    message: '',
    data,
  };
}
