import { makeAutoObservable } from 'mobx';

class WorkoutStore {
  movements = '';
  timeDomain = '';
  rounds = '';

  setMovements = (movements) => {
    this.movements = movements;
  };

  setTimeDomain = (timeDomain) => {
    this.timeDomain = timeDomain;
  };

  setRounds = (rounds) => {
    this.rounds = rounds;
  };

    constructor() {
        makeAutoObservable(this);
    }
}

const workoutStore = new WorkoutStore();
export default workoutStore;
