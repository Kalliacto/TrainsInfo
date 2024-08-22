import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { Characteristic, TrainInfo } from '../types';

export type GetInfoTrainsAction = ThunkAction<Promise<void>, {}, unknown, { type: 'trainsInfo/getInfoTrains' }>;

interface TrainsInfoState {
    trains: TrainInfo[];
    loading: boolean;
    currentTrain: string;
    currentTrainInfo?: TrainInfo;
    error?: Error;
}

const initialState: TrainsInfoState = {
    loading: true,
    trains: [],
    currentTrain: '',
};

export const getInfoTrains = createAsyncThunk<TrainInfo[], void, { rejectValue: Error }>(
    'trainsInfo/getInfoTrains',
    async (_, thunkAPI) => {
        try {
            const res = await fetch(
                'https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json'
            );
            const resInfo = await res.json();
            return resInfo;
        } catch (error) {
            // if (error instanceof Error) {
            //     const newError = new Error(error.message);
            //     return thunkAPI.rejectWithValue(newError);
            // } else {
            //     console.error('Error message is not a string:', error);
            // }
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
        setValue(state, action: PayloadAction<[number, string, number]>) {
            if (state.currentTrainInfo) {
                state.currentTrainInfo.characteristics = state.currentTrainInfo.characteristics.map((el, i) => {
                    if (i === action.payload[2]) {
                        return { ...el, [action.payload[1]]: [action.payload[0]] };
                    } else return el;
                });
                state.trains = state.trains.map((el) => (el === state.currentTrainInfo ? state.currentTrainInfo : el));
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfoTrains.fulfilled, (state, action: PayloadAction<TrainInfo[]>) => {
            state.trains = action.payload;
            state.loading = false;
        });
        // builder.addCase(getInfoTrains.rejected, (state, action: PayloadAction<Error>) => {
        //     state.error = action.payload;
        //     state.loading = false;
        // });
    },
});

export const { setCurrentTrain, setValue } = trainsSlice.actions; // Для reducers

export default trainsSlice.reducer;
