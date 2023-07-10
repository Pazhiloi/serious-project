import type {
  ThunkConfig,
  StateSchema,
  ReduxStoreWithManager,
  StateSchemaKey
} from "./config/StateSchema";

import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";

export {
  StoreProvider,
  createReduxStore,
};

export type {
  StateSchema,
  AppDispatch,
  ThunkConfig,
  StateSchemaKey,
  ReduxStoreWithManager,
};
