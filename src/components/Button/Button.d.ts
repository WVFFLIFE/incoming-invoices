import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface ButtonProps {
  /**
   * Class name that is applied to button
   */
  className?: string;
  /**
   * Icon that is shown before label
   */
  icon?: typeof SvgIcon;
  /**
   * Icon props
   */
  IconProps?: SvgIconProps;
  /**
   * Button label
   */
  label: string;
  /**
   * Click handler
   */
  onClick(e: MouseEvent<HTMLButtonElement>): void;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
   disabled?: boolean;
}

export default function Button(props: ButtonProps): JSX.Element;