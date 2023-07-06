import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

type Props = {
  name: string;
};

export function DateTimePicker({ name }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={new Date().setHours(13, 0)}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          dateFormat="Pp"
          locale="pt-BR"
          showTimeSelect
          selected={new Date(value)}
          onChange={(date: Date) => onChange(date.toISOString())}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      )}
    />
  );
}
