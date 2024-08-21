import { useAppDispatch, useAppSelector } from './store/hooks';
import './App.css';
import { RootState } from './store/store';
import { useEffect, useState } from 'react';
import { getInfoTrains } from './store/trainsSlice';
import TrainTable from './components/TrainTable/TrainTable';
import CharacteristicsTable from './components/CharacteristicsTable/CharacteristicsTable';

function App() {
    const dispatch = useAppDispatch();
    const { loading, trains, currentTrain } = useAppSelector((state: RootState) => state.trains);

    useEffect(() => {
        if (loading) {
            dispatch(getInfoTrains());
        }
    }, [dispatch, loading]);

    return (
        <div className='App'>
            <TrainTable trains={trains} />
            {!!currentTrain && <CharacteristicsTable train={trains.find((el) => el.name === currentTrain)} />}
        </div>
    );
}

export default App;
