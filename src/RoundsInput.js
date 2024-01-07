import React from 'react';
import { observer } from 'mobx-react';
import workoutStore from './WorkoutStore';
import { FormGroup, Input, Label } from 'reactstrap';

const RoundsInput = () => {
    return (
        <FormGroup floating>
        <Input
            type="text"
            value={workoutStore.rounds}
            onChange={(e) => workoutStore.setRounds(e.target.value)}
            placeholder='Enter Rounds'
        />
        <Label>Rounds</Label>
        </FormGroup>
    );
};

export default observer(RoundsInput);