import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { observer } from 'mobx-react';
import workoutStore from './WorkoutStore.ts';

const CrossFitMovementSelector = () => {
  // List of predefined CrossFit movements
  const crossFitMovements = ['Squats', 'Deadlifts', 'Push-ups', 'Pull-ups', /* Add more movements */];

  const handleCheckboxChange = (selectedMovement) => {
    const currentMovements = workoutStore.movements || [];
    
    if (currentMovements.includes(selectedMovement)) {
      // If the movement is already selected, remove it
      workoutStore.setMovements(currentMovements.filter(movement => movement !== selectedMovement));
    } else {
      // If the movement is not selected, add it
      workoutStore.setMovements([...currentMovements, selectedMovement]);
    }
  };

  return (
    <ButtonGroup>
      {crossFitMovements.map((movement, index) => (
        <Button
          key={index}
          outline
          color="primary"
          onClick={() => handleCheckboxChange(movement)}
          active={workoutStore.movements && workoutStore.movements.includes(movement)}
        >
          {movement}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default observer(CrossFitMovementSelector);
