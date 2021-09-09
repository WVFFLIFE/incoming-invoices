export interface CalendarInputProps {
  date: Date | null;
  pattern?: string;
  onChange(d: Date | null): void;
  className?: string;
}

export function CalendarInput(props: CalendarInputProps): JSX.Element;