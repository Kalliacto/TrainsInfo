import { TrainProps } from '../../types';
import CharacteristicsRow from '../CharacteristicsRow/CharacteristicsRow';
import './style.css';

const CharacteristicsTable: React.FC<TrainProps> = ({ train }) => {
    console.log(train);
    return (
        <section className='wrapper'>
            <table className='table'>
                <caption className='table__title'>
                    Характеристики
                    <br />
                    {train?.name}
                </caption>
                <thead className='table__thead'>
                    <tr>
                        <th className='table__th'>Ток двигателя</th>
                        <th className='table__th'>Сила тяги</th>
                        <th className='table__th'>Скорость</th>
                    </tr>
                </thead>
                <tbody>
                    {train?.characteristics.map((characteristics, i) => {
                        console.log(characteristics);
                        return <CharacteristicsRow key={i} characteristics={characteristics} />;
                    })}
                </tbody>
            </table>
        </section>
    );
    {
        /* <CharacteristicsRow /> */
    }
};

export default CharacteristicsTable;
