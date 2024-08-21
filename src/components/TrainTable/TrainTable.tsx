import TrainRow from '../TrainRow/TrainRow';
import { TrainTableProps } from '../../types';
import './style.css';
import { memo } from 'react';

const TrainTable: React.FC<TrainTableProps> = memo(({ trains }) => {
    return (
        <section className='wrapper'>
            <table className='table'>
                <caption className='table__title'>Поезда</caption>
                <thead className='table__thead'>
                    <tr>
                        <th className='table__th'>Название</th>
                        <th className='table__th'>Описание</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map((train) => {
                        return <TrainRow key={train.name} trainNumber={train.name} description={train.description} />;
                    })}
                </tbody>
            </table>
        </section>
    );
});

export default TrainTable;
