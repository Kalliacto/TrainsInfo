import React, { useState } from 'react';
import { Characteristic } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { setValue } from '../../store/trainsSlice';

interface CellProps {
    value: number;
    characteristicName: string;
    index: number;
    setValid: (value: boolean) => void;
}

const Cell: React.FC<CellProps> = ({ value, characteristicName, index, setValid }) => {
    const [visible, setVisible] = useState(false);
    const [newValue, setNewValue] = useState(String(value));
    let valid: boolean = checkValidate(Number(newValue), characteristicName);
    const dispatch = useAppDispatch();

    function changeValue(str: string) {
        setNewValue(str);
        setValid(valid);
    }

    function checkValidate(num: number, type: string): boolean {
        switch (type) {
            case 'engineAmperage':
                if (num >= 0 && Number.isInteger(num)) return true;
                break;
            case 'force':
                if (num >= 0 && !Number.isInteger(num)) return true;
                break;
            case 'speed':
                if (num >= 0 && Number.isInteger(num)) return true;
                break;
        }
        return false;
    }

    return (
        <td onClick={() => setVisible(true)} className={valid ? '' : 'error'}>
            {!!visible ? (
                <input className='td__input' value={newValue} onChange={(e) => changeValue(e.target.value)} />
            ) : (
                <>{value}</>
            )}
        </td>
    );
};

export default Cell;
