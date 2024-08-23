import { useAppDispatch, useAppSelector } from './store/hooks';
import './App.css';
import { RootState } from './store/store';
import { useEffect } from 'react';
import { getInfoTrains } from './store/trainsSlice';
import TrainTable from './components/TrainTable/TrainTable';
import CharacteristicsTable from './components/CharacteristicsTable/CharacteristicsTable';

function App() {
    const dispatch = useAppDispatch();
    const { loading, trains, currentTrain } = useAppSelector((state: RootState) => state.trains);
    const train = trains.find((el) => el.name === currentTrain) || null;

    useEffect(() => {
        if (loading) {
            dispatch(getInfoTrains());
        }
    }, [dispatch, loading]);

    return (
        <div className='App'>
            <TrainTable trains={trains} />
            {!!train && <CharacteristicsTable train={train} />}
        </div>
    );
}

export default App;
