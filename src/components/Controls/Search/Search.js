import { useState } from 'react';

import Dropdown from 'components/Dropdown';
import { IconButton } from 'components/StyledComponents'
import { SearchIcon } from 'components/Icons';
import CloseIcon from '@material-ui/icons/Close';
import Input from './Input';

import clsx from 'clsx';
import { useStyles } from './style';

const isEmpty = (val) => {
  return val !== 0 && !!!(val);
}

const Search = ({
  className,
  searchTerm,
  handleChangeSearchTerm
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const onOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setAnchorEl(null);
  }

  const open = !!anchorEl;

  return (
    <>
      <IconButton
        className={clsx(classes.iconButton, className, {
          [classes.active]: !isEmpty(searchTerm),
          [classes.open]: open,
        })}
        onClick={onOpen}
      >
        {
          open
            ? <CloseIcon className={classes.closeIcon} />
            : <SearchIcon className={classes.searchIcon} />
        }
      </IconButton>
      <Dropdown
        className={classes.dropdown}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Input
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          onClose={onClose}
        />
      </Dropdown>
    </>
  )
}

export default Search;