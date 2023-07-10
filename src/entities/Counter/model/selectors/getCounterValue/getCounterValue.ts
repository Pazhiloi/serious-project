import { buildSelector } from "@/shared/lib/store";
export const [useCounterValue, gettCounterValue] = buildSelector(
  (state) => state.counter.value
);