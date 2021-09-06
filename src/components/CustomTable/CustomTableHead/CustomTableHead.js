import { useTranslation } from 'react-i18next';

import Checkbox from 'components/Checkbox';
import { IconButton } from 'components/StyledComponents';
import { SortArrows, SortArrowDesc } from 'components/Icons';
import Box from '@material-ui/core/Box';

import clsx from 'clsx';
import { useStyles } from './style';

const CustomTableHead = ({
  headers,
  selected,
  withCheckbox,
  order,
  orderBy,
  onSelectAllClick
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const renderCheckbox = () => {
    return (
      <Checkbox 
        checked={selected && selected.length > 0}
        onChange={onSelectAllClick}
      />
    )
  }

  return (
    <thead>
      <tr className={classes.tr}>
        {
          withCheckbox
            ? (
              <th className={classes.th}>
                {renderCheckbox()}
              </th>
            ) : null
        }
        {
          headers.map(({ id, label }) => {
            const Icon = id === orderBy
              ? SortArrowDesc
              : SortArrows

            return (
              <th key={id} className={classes.th}>
                <Box
                  display="inline-flex"
                  alignItems="center"
                >
                  <IconButton>
                    <Icon 
                      className={clsx(classes.icon, {
                        [classes.arrowAsc]: order === 'asc'
                      })}
                    />
                  </IconButton>
                  {t(label)}
                </Box>
              </th>
            )
          })
        }
      </tr>
    </thead>
  )
}

export default CustomTableHead;