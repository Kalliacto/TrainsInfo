import { memo } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { TrainRowProps } from '../../types';
import './style.css';
import { setCurrentTrain } from '../../store/trainsSlice';

const TrainRow: React.FC<TrainRowProps> = memo(({ trainNumber, description }) => {
    const dispatch = useAppDispatch();

    return (
        <tr onClick={() => dispatch(setCurrentTrain(trainNumber))}>
            <td>{trainNumber}</td>
            <td>{description}</td>
        </tr>
    );
});

export default TrainRow;
