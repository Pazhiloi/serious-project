import { StateSchema } from "@/app/providers/StoreProvider";
import { Article } from "@/entities/Article";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ArticleDetaisPageRecommendationsSchema } from "../types/ArticleDetaisPageRecommendationsSchema";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendation/fetchArticleRecommendation";


const recommendationAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations =
  recommendationAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      recommendationAdapter.getInitialState()
  );

  const articleDetaisPageRecommendationsSlice = createSlice({
    name: "articleDetaisPageRecommendationsSlice",
    initialState:
      recommendationAdapter.getInitialState<ArticleDetaisPageRecommendationsSchema>(
        {
          isLoading: false,
          error: undefined,
          ids: [],
          entities: {},
        }
      ),
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchArticleRecommendations.pending, (state, action) => {
          state.error = undefined;
          state.isLoading = true;
        })
        .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
          state.isLoading = false;
          recommendationAdapter.setAll(state, action.payload);
        })
        .addCase(fetchArticleRecommendations.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });

  export const { reducer: articleDetaisPageRecommendationsReducer } =
    articleDetaisPageRecommendationsSlice;