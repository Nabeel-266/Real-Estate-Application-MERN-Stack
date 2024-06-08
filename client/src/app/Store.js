import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import Slices
import userReducer from "./slices/userSlice";

// Persist Configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine All Reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Set Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store and export it
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create Persist Store and export it
export const persistor = persistStore(store);
