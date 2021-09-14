export interface CalendarProps {
  selectedDate: Date | null;
  limitDate?: Date | null;
  disabled?: boolean;
  dateInput?: boolean;
  handleChangeDate(date: Date | null): void;
}

export function Calendar(props: CalendarProps): JSX.Element;