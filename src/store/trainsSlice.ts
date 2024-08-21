import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TrainInfo } from '../types';

export type GetInfoTrainsAction = ThunkAction<Promise<void>, {}, unknown, { type: 'trainsInfo/getInfoTrains' }>;

interface TrainsInfoState {
    trains: TrainInfo[];
    loading: boolean;
    error?: Error;
    currentTrain: string;
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

export const { setCurrentTrain } = trainsSlice.actions; // Для reducers

export default trainsSlice.reducer;
