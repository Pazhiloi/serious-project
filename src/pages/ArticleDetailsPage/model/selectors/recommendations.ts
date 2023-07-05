import { StateSchema } from "@/app/providers/StoreProvider";

export const getArticleReacommendationsIsLoading = (state: StateSchema) => {
  return state.articleDetailsPage?.recommendations?.isLoading;
};
export const getArticleReacommendationsIsError = (state: StateSchema) => {
  return state.articleDetailsPage?.recommendations?.error;
};
