import * as React from "react";

export interface DropdownPicker {
  /**
   * Add class name to the root div
   */
  className?: string;
  /**
   * If `true`, the component is disabled
   * @default false
   */
  disabled?: boolean;
   /**
   * Render the selected value.
   *
   * @returns {ReactNode}
   */
  renderValue?: () => React.ReactNode;
  /**
   * Render dropdown`s body.
   * 
   * @param {Function} callback Call it if you want to close the dropdown.
   */
  renderBody?: (onClose: () => void) => React.ReactNode;
  /**
   * If `true`, modal is resizable.
   * @default false
   */
  resizable?: boolean;
  /**
   * Default width of dropdown.
   */
  defaultWidth?: number;
}