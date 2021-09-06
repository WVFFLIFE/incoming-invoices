import { Cooperative } from 'models';

export interface CooperativePickerProps {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the component is resizable
   * @default false
   */
  resizable?: boolean;
  /**
   * List of cooperatives
   */
  cooperatives: Cooperative[];
  /**
   * Selected cooperative from cooperatives list
   */
  selectedCooperative: Cooperative | null;
  handleChangeCooperative(coop: Cooperative | null): void;
}

export default function CooperativePicker(props: CooperativePickerProps): JSX.Element;