import { useState, useRef, useMemo } from 'react';

import Dropdown from './Dropdown';
import Output from './Output';
import Body from './Body';

const CooperativePicker = ({
  disabled,
  resizable,
  cooperatives,
  selectedCooperative,
  handleChangeCooperative
}) => {
  const output = useRef();

  const [defaultAnchorEl, setDefaultAnchorEl] = useState(null);
  const open = !!defaultAnchorEl;

  const coopIdx = useMemo(() => {
    if (!selectedCooperative) return null;
    return cooperatives.findIndex(coop => coop.Id === selectedCooperative.Id);
  }, [cooperatives, selectedCooperative]);

  const onOpen = (e) => {
    setDefaultAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setDefaultAnchorEl(null);
  }

  const selectNext = (e) => {
    e.stopPropagation();
    handleChangeCooperative(cooperatives[coopIdx + 1]);
  }

  const selectPrev = (e) => {
    e.stopPropagation();
    handleChangeCooperative(cooperatives[coopIdx - 1]);
  }

  return (
    <>
      <Output
        ref={output}
        disabled={disabled}
        selectedCooperative={selectedCooperative}
        open={open}
        onOpen={onOpen}
        selectNext={selectNext}
        selectPrev={selectPrev}
        disabledNextBtn={coopIdx === cooperatives.length - 1}
        disabledPrevBtn={coopIdx === 0}
      />
      <Dropdown
        anchorEl={defaultAnchorEl}
        open={open}
        resizable={resizable}
        onClose={onClose}
        defaultWidth={
          output.current
            ? output.current.getBoundingClientRect().width
            : undefined
        }
      >
        <Body
          cooperatives={cooperatives}
          selectedCooperative={selectedCooperative}
          handleChangeCooperative={handleChangeCooperative}
          onClose={onClose}
        />
      </Dropdown>
    </>
  )
}

export default CooperativePicker;