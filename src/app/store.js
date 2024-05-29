import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from '../features/locationsSlice';
import assetsReducer from '../features/assetsSlice';
import companiesReducer from '../features/companiesSlice';

const store = configureStore({
    reducer: {
        locations: locationsReducer,
        assets: assetsReducer,
        companies: companiesReducer,
    },
});

export { store };
