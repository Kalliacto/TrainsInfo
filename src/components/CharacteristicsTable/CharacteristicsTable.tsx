import { useLayoutEffect, useState } from 'react';
import { CharacteristicName, TrainInfo, TrainProps } from '../../types';
import Cell from '../Cell/Cell';

const CharacteristicsTable: React.FC<TrainProps> = ({ train }) => {
    const [valid, setValid] = useState(getValidArray(train));

    function changeValidStatus(index: number, value: string, characteristicName: string): void {
        setValid(valid.map((el, i) => (i === index ? checkValidate(value, characteristicName) : el)));
    }

    useLayoutEffect(() => {
        setValid(getValidArray(train));
    }, [train.characteristics]);

    function toggleAccessButton(): boolean {
        return valid.some((value) => value === false);
    }

    function getValidArray(train: TrainInfo): boolean[] {
        let arr: boolean[] = [];

        train.characteristics.forEach(({ engineAmperage, force, speed }) => {
            arr.push(
                ...[
                    checkValidate(String(engineAmperage), 'engineAmperage'),
                    checkValidate(String(force), 'force'),
                    checkValidate(String(speed), 'speed'),
                ]
            );
        });

        return arr;
    }

    function dataLog(): void {
        console.log(
            `Скоростные ограничения ${train?.name} ${train?.characteristics
                .map((el) => el.speed)
                .sort((a, b) => a - b)}`
        );
    }

    function checkValidate(data: string, type: string): boolean {
        switch (type) {
            case 'speed':
            case 'engineAmperage':
                if (Number(data) >= 0 && Number.isInteger(Number(data))) return true;
                break;
            case 'force':
                if (Number(data) >= 0 && /^[^-]\d{0,}(\.\d{1,})?$/.test(data)) return true;
                break;
        }
        return false;
    }

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
                        {train?.characteristics.map(({ engineAmperage, force, speed }, i) => {
                            return (
                                <tr key={train.name + i}>
                                    <Cell
                                        value={engineAmperage}
                                        characteristicName={CharacteristicName.engineAmperage}
                                        index={i * 3}
                                        indexObj={i}
                                        valid={valid[i * 3]}
                                        changeValidStatus={changeValidStatus}
                                        trainName={train.name}
                                    />
                                    <Cell
                                        value={force}
                                        characteristicName={CharacteristicName.force}
                                        index={i * 3 + 1}
                                        indexObj={i}
                                        valid={valid[i * 3 + 1]}
                                        changeValidStatus={changeValidStatus}
                                        trainName={train.name}
                                    />
                                    <Cell
                                        value={speed}
                                        characteristicName={CharacteristicName.speed}
                                        index={i * 3 + 2}
                                        indexObj={i}
                                        valid={valid[i * 3 + 2]}
                                        changeValidStatus={changeValidStatus}
                                        trainName={train.name}
                                    />
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <button disabled={toggleAccessButton()} className='characteristics__btn' onClick={dataLog}>
                Отправить данные
            </button>
        </section>
    );
};

export default CharacteristicsTable;
