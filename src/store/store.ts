import { configureStore } from '@reduxjs/toolkit';
import trainsSlice from './trainsSlice';

const store = configureStore({
    reducer: {
        trains: trainsSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
