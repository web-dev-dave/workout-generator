import './App.css';
import MovementsInput from './MovementsInput';
import RoundsInput from './RoundsInput';
import TimeDomainInput from './TimeDomainInput';
import WorkoutGenerator from './WorkoutGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MovementsInput />
        <RoundsInput />
        <TimeDomainInput />
        <WorkoutGenerator />
      </header>
    </div>
  );
}

export default App;
