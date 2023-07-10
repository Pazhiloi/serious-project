export { ArticleList } from './ui/ArticleList/ArticleList';
export { ArticleDetails } from "./ui/ArticleDetails/ArticleDetails";
export {
  ArticleView,
  ArticleSortField,
  ArticleType,
  ArticleBlockType,
} from "./model/const/articlesConst";

export type { Article } from "./model/types/article";
export type { ArticleDetailsSchema } from "./model/types/articleDetailsSchema";

export { getArticleDetailsData } from "./model/selectors/articleDetails";

export { articleDetailsReducer } from "./model/slice/articleDetailsSlice";

