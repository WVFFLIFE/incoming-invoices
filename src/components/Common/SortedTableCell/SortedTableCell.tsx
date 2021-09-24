import { IconButton } from "components/StyledComponents";
import { SortArrows, SortArrowDesc } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from "./style";

interface SortedTableCellProps extends React.HTMLProps<HTMLTableCellElement> {
  orderBy: string;
  order: 'asc' | 'desc';
  id: string;
  label: string;
  onClick(): void;
}

const SortedTableCell: React.FC<SortedTableCellProps> = ({
  orderBy,
  order,
  id,
  label,
  onClick,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <td className={classes.td} {...rest}>
      <span className={classes.label} onClick={onClick}>
        {label}
        <IconButton className={classes.sortIconBtn}>
          {
            orderBy !== id
              ? <SortArrows className={classes.sortIcon} />
              : <SortArrowDesc className={clsx(classes.sortIcon, {
                [classes.sortIconAsc]: order === 'asc'
              })} />
          }
        </IconButton>
      </span>
    </td>
  )
}

export default SortedTableCell;