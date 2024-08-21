import './style.css';
import { CharacteristicProps } from '../../types';

const CharacteristicsRow: React.FC<CharacteristicProps> = ({ characteristics }) => {
    return (
        <tr>
            <td>{characteristics.engineAmperage}</td>
            <td>{characteristics.force}</td>
            <td>{characteristics.speed}</td>
        </tr>
    );
};

export default CharacteristicsRow;
