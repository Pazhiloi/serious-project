import { Article, ArticleView } from "@/entities/Article";
import { EntityState } from "@reduxjs/toolkit";

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;
  
  page: number;
  limit?: number;
  hasMore: boolean;
}
