export type FormValue = {
  id: number;
  value: string;
};

export type StaticFormOutput = {
  type: string;
  type_id: number;
  type_title: string;
  type_value: string;
  values: FormValue[];
  // custom_values: string[];
  created_at?: string;
};
