export interface TrainInfo {
    name: string;
    description: string;
    characteristics: Characteristic[];
}
export enum CharacteristicName {
    speed = 'speed',
    engineAmperage = 'engineAmperage',
    force = 'force',
}

export interface Characteristic {
    speed: number;
    force: number;
    engineAmperage: number;
}

export interface TrainTableProps {
    trains: TrainInfo[];
}

export interface TrainRowProps {
    trainNumber: string;
    description: string;
}

export interface TrainProps {
    train: TrainInfo;
}

export interface CharacteristicProps {
    characteristics: Characteristic;
    index: number;
    setValid: (value: boolean) => void;
}
export interface CellProps {
    value: number;
    characteristicName: CharacteristicName;
    index: number;
    indexObj: number;
    valid: boolean;
    trainName: string;
    changeValidStatus: (index: number, value: string, characteristicName: string) => void;
}
