import { StateSchema } from "@/app/providers/StoreProvider";
import { ArticleView } from "@/entities/Article";

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlePage?.isLoading;
export const getArticlesPageError = (state: StateSchema) =>
  state.articlePage?.error;
export const getArticlesPageView = (state: StateSchema) =>
  state.articlePage?.view || ArticleView.SMALL;

  export const getArticlesPageNum = (state: StateSchema) =>
    state.articlePage?.page || 1;
  export const getArticlesPageLimit = (state: StateSchema) =>
    state.articlePage?.limit || 9;
  export const getArticlesPageHasMore = (state: StateSchema) =>
    state.articlePage?.hasMore;
  export const getArticlesPageInited = (state: StateSchema) =>
    state.articlePage?._inited;
