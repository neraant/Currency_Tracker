import { useState } from 'react';
import { Circle, ToggleWrapper } from './styled';

export const ToggleButton = () => {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled((pre) => !pre);
  };

  return (
    <ToggleWrapper toggled={toggled} onClick={handleClick}>
      <Circle toggled={toggled} />
    </ToggleWrapper>
  );
};
