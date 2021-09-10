export interface DatePickerProps {
  /**
   * Date of the picker
   */
  currentDate: Date | null;
  /**
   * Date format
   * @default d.M.yyyy
   */
  dateFormat?: string;
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled?: boolean;
  dateInput?: boolean;
  onChange(date: Date | null): void;
}

export default function DatePicker(props: DatePickerProps): JSX.Element;