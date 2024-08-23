import React, { useLayoutEffect, useRef, useState } from 'react';
import { CellProps } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { setValue } from '../../store/trainsSlice';

const Cell: React.FC<CellProps> = ({
    value,
    characteristicName,
    index,
    valid,
    trainName,
    indexObj,
    changeValidStatus,
}) => {
    const [visible, setVisible] = useState(false);
    const [newValue, setNewValue] = useState(String(value));
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    function changeValue(str: string) {
        changeValidStatus(index, str, characteristicName);
        setNewValue(str);
    }

    function onBlur(str: string) {
        setVisible(false);
        if (!valid) return;
        if (String(value) === newValue) return;
        dispatch(
            setValue({
                value: str,
                trainName,
                indexObj,
                characteristicName,
            })
        );
    }

    useLayoutEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [visible]);

    return (
        <td onClick={() => setVisible(true)} className={valid ? 'td' : 'td error'}>
            {visible ? (
                <input
                    ref={inputRef}
                    className='td__input'
                    value={newValue}
                    onChange={(e) => changeValue(e.target.value)}
                    onBlur={(e) => onBlur(e.target.value)}
                />
            ) : (
                <>{newValue}</>
            )}
        </td>
    );
};

export default Cell;
