import MuiButton from '@material-ui/core/Button';

import clsx from 'clsx';
import { useStyles } from './style';

const Button = ({
  className,
  icon: Icon,
  IconProps,
  label,
  onClick,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      className={clsx(classes.button, className)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
    {Icon && <Icon className={classes.icon} {...IconProps}/>}
    {label}
    </MuiButton>
  )
}

export default Button;