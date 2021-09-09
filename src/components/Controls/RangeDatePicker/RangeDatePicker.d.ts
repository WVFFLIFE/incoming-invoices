interface Range {
  from: Date | null;
  to: Date | null;
}

export interface RangeDatePickerProps {
  from: Date | null;
  to: Date | null;
  disabled: boolean;
  onChange(range: Range): void;
}

export default function RangeDatePicker(props: RangeDatePickerProps): JSX.Element;
