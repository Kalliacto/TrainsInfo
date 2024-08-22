export interface TrainInfo {
    name: string;
    description: string;
    characteristics: Characteristic[];
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
    train: TrainInfo | undefined;
}

export interface CharacteristicProps {
    characteristics: Characteristic;
    index: number;
    setValid: (value: boolean) => void;
}
