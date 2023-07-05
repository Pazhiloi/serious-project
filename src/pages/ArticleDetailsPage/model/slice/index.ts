import { combineReducers } from "@reduxjs/toolkit";
import { articleDetaisPageRecommendationsReducer } from "./articleDetaisPageRecommendationsSlice";
import { articleDetailsCommnetsReducer } from "./articleDetailsCommentsSlice";
import { ArticleDetailsPageSchema } from "../types";

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetaisPageRecommendationsReducer,
    comments: articleDetailsCommnetsReducer,
  });
