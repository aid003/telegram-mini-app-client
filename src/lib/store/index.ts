import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/lib/features/user/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], 
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV === "development",
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

// Обновленные типы
export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type Persistor = ReturnType<typeof persistStore>;
