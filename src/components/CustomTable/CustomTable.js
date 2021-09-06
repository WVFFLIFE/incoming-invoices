import CustomTableHead from "./CustomTableHead";

import { useStyles } from './style';

const CustomTable = ({
  headers,
  data,
  selected,
  order,
  orderBy,
  onSelectAllClick,
  withCheckbox = false,
  handleRowClick
}) => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <CustomTableHead 
        withCheckbox
        headers={headers}
        selected={selected}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={onSelectAllClick}
      />
    </table>
  )
}

export default CustomTable;