import { Form } from '../../domain/static.form.model';
import { StaticFormDataOutput } from '../output/static-form-data.output';
import { StaticFormOutput } from '../output/static.form.output';


export function mapToStaticFormOutputUtil(forms: Form[]): StaticFormDataOutput {
  const data: StaticFormOutput[] = forms?.length ? forms.map(form => ({
    type: form.type,
    type_id: form.type_id,
    type_title: form.type_title,
    type_value: form.type_value,
    values: form.values,
    // is_active: form.is_active,
    // order: form.order
  })) : [];
  return {
    success: !!data.length,
    message: '',
    data,
  };
}
