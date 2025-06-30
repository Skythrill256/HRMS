import { configureStore } from '@reduxjs/toolkit';
import projecReducer from './slices/projectSlice' ;
import clientReducer from './slices/clientSlice'
 
export const store = configureStore({
    reducer:{
        clients:clientReducer,
        projects:projecReducer
    },
});