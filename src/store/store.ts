import { configureStore } from "@reduxjs/toolkit";
import { authReducer, configReducer, quotationsReducer, uiReducer } from "./reducers";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        quotations: quotationsReducer,
        config: configReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
