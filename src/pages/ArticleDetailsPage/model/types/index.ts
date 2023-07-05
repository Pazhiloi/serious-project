import { ArticleDetailsCommentSchema } from "./ArticleDetailsCommentSchema";
import { ArticleDetaisPageRecommendationsSchema } from "./ArticleDetaisPageRecommendationsSchema";

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetaisPageRecommendationsSchema;
}
