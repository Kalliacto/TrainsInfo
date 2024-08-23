import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { CharacteristicName, TrainInfo } from '../types';

export type GetInfoTrainsAction = ThunkAction<Promise<void>, {}, unknown, { type: 'trainsInfo/getInfoTrains' }>;

interface TrainsInfoState {
    trains: TrainInfo[];
    loading: boolean;
    currentTrain: string;
    currentTrainInfo?: TrainInfo;
    error?: Error;
}

interface setValueFn {
    value: string;
    trainName: string;
    indexObj: number;
    characteristicName: CharacteristicName;
}

const initialState: TrainsInfoState = {
    loading: true,
    trains: [],
    currentTrain: '',
};

export const getInfoTrains = createAsyncThunk<TrainInfo[], void, { rejectValue: Error }>(
    'trainsInfo/getInfoTrains',
    async () => {
        try {
            const res = await fetch(
                'https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json'
            );
            const resInfo = await res.json();
            return resInfo;
        } catch (error) {
            console.error('Error message is not a string:', error);
        }
    }
);

const trainsSlice = createSlice({
    name: 'trainsSlice',
    initialState,
    reducers: {
        setCurrentTrain(state, action: PayloadAction<string>) {
            state.currentTrain = action.payload;
            state.currentTrainInfo = state.trains.find((train) => train.name === state.currentTrain);
        },
        setValue(state, { payload }: PayloadAction<setValueFn>) {
            let train = state.trains.find((train) => train.name === payload.trainName);
            if (train) {
                train.characteristics[payload.indexObj][payload.characteristicName] = Number(payload.value);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfoTrains.fulfilled, (state, action: PayloadAction<TrainInfo[]>) => {
            state.trains = action.payload;
            state.loading = false;
        });
    },
});

export const { setCurrentTrain, setValue } = trainsSlice.actions;

export default trainsSlice.reducer;
