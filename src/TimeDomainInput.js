import React from 'react';
import { observer } from 'mobx-react';
import workoutStore from './WorkoutStore';

const TimeDomainInput = () => {
    return (
        <div>
        <label>Time Domain:{' '}</label>
        <input
            type="text"
            value={workoutStore.timeDomain}
            onChange={(e) => workoutStore.setTimeDomain(e.target.value)}
        />
        </div>
    );
};

export default observer(TimeDomainInput);