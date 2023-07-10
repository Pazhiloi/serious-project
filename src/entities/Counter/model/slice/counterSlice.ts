import { PayloadAction } from "@reduxjs/toolkit";
import { buildSlice } from "@/shared/lib/store";
import { CounterSchema } from "../types/сounterSchema";

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = buildSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    add: (state, { payload }: PayloadAction<number>) => {
      state.value += payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const {
  actions: counterAction,
  reducer: counterReducer,
  useAction: useCounterActions,
} = counterSlice;
