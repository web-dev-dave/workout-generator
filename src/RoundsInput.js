import React from 'react';
import { observer } from 'mobx-react';
import workoutStore from './WorkoutStore';

const RoundsInput = () => {
    return (
        <div>
        <label>Rounds:{' '}</label>
        <input
            type="text"
            value={workoutStore.rounds}
            onChange={(e) => workoutStore.setRounds(e.target.value)}
        />
        </div>
    );
};

export default observer(RoundsInput);