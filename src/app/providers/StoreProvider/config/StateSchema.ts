import { ArticleDetailsSchema } from "@/entities/Article";
import { CounterSchema } from "@/entities/Counter";
import { ProfileSchema } from "@/entities/Profile";
import { UserSchema } from "@/entities/User";
import { LoginSchema } from "@/features/AuthByUsername";
import { ScrollSaveSchema } from "@/features/ScrollSave";
import { AddCommentFormSchema } from "@/features/addCommentForm";
import { ArticleDetailsCommentSchema } from "@/pages/ArticleDetailsPage";
import { ArticlePageSchema } from "@/pages/ArticlesPage";
import { AnyAction, CombinedState, Dispatch, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollSave: ScrollSaveSchema;

  // async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentSchema;
  addCommentForm?: AddCommentFormSchema;
  articlePage?: ArticlePageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = ObjectRecord<StateSchemaKey, boolean>;


export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}