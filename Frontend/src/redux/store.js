import { configureStore } from '@reduxjs/toolkit';
import projecReducer from './slices/projectSlice' ;
import clientReducer from './slices/clientSlice'
 import workOrderReducer  from './slices/WorkOrderSlice.js'
export const store = configureStore({
    reducer:{
        clients:clientReducer,
        projects:projecReducer,
        workOrders:workOrderReducer 
    },
});