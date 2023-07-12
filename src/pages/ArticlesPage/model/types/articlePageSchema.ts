import { Article, ArticleSortField, ArticleType, ArticleView } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { EntityState } from "@reduxjs/toolkit";

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
