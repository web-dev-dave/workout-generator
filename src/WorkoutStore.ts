import { makeAutoObservable } from "mobx";

class WorkoutStore {
  movements: string[] = [];

  setMovements = (movements) => {
    console.log(movements);
    this.movements.push(movements);
  };

  clearMovements = () => {
    this.movements = [];
  };

  constructor() {
    makeAutoObservable(this);
  }
}

const workoutStore = new WorkoutStore();
export default workoutStore;
