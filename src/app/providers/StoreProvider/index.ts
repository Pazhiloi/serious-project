import  {
  ThunkConfig,
  StateSchema,
  ReduxStoreWithManager,
} from "./config/StateSchema";

import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";

export {
  StoreProvider,
  createReduxStore,
  ReduxStoreWithManager,
};

export type { StateSchema, AppDispatch, ThunkConfig };
