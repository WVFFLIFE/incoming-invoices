import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab';
import { useStyles } from './style';

const Alert = ({
  severity,
  title,
  children
}) => {
  const classes = useStyles();

  return (
    <MuiAlert
      severity={severity}
      classes={{
        message: classes.message
      }}
    >
      <AlertTitle
        classes={{
          root: classes.titleRoot
        }}
      >
        {title}
      </AlertTitle>
      {children}
    </MuiAlert>
  )
}

export default Alert;