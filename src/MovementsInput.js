import React from 'react';
import { observer } from 'mobx-react';
import workoutStore from './WorkoutStore';

const MovementsInput = () => {
  return (
    <div>
      <label>Movements:{' '}</label>
      <input
        type="text"
        value={workoutStore.movements}
        onChange={(e) => workoutStore.setMovements(e.target.value)}
      />
    </div>
  );
};

export default observer(MovementsInput);
