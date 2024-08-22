import './style.css';
import { CharacteristicProps } from '../../types';
import Cell from '../Cell/Cell';

const CharacteristicsRow: React.FC<CharacteristicProps> = ({ characteristics, index, setValid }) => {
    return (
        <tr>
            <Cell
                value={characteristics.engineAmperage}
                characteristicName={'engineAmperage'}
                index={index}
                setValid={setValid}
            />
            <Cell value={characteristics.force} characteristicName={'force'} index={index} setValid={setValid} />
            <Cell value={characteristics.speed} characteristicName={'speed'} index={index} setValid={setValid} />
        </tr>
    );
};

export default CharacteristicsRow;
