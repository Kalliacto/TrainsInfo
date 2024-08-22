import { useState } from 'react';
import { TrainProps } from '../../types';
import CharacteristicsRow from '../CharacteristicsRow/CharacteristicsRow';

const CharacteristicsTable: React.FC<TrainProps> = ({ train }) => {
    const [valid, setValid] = useState(true);

    return (
        <section style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='wrapper'>
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
                            return (
                                <CharacteristicsRow
                                    key={i}
                                    characteristics={characteristics}
                                    index={i}
                                    setValid={setValid}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button disabled={!valid} className='characteristics__btn'>
                Отправить данные
            </button>
        </section>
    );
};
// TODO: Доработать проверку состояния валидности по всем ячейкам и только потом изменять общее состояние валидности
export default CharacteristicsTable;
