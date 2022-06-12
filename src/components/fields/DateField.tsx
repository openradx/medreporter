import { DatePicker } from "@mantine/dates"

interface DateFieldProps {
  label: string
}

export const DateField = ({ label }: DateFieldProps) => {
    return <DatePicker label={label} />
}
