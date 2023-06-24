import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";
import { ArticleDetailsSchema } from "../types/articleDetailsSchema";
import { articleDetailsReducer } from "./articleDetailsSlice";

const data = { id: "1", title: "subtitle" };

describe("articleDetailsSlice.test", () => {
  test("test isLoading", () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
    };
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.fulfilled
      )
    ).toEqual({ isLoading: true });
  });

 test("test get data", () => {
   const state: DeepPartial<ArticleDetailsSchema> = {
     data: undefined,
     error: undefined,
     isLoading: true,
   };
   expect(
     articleDetailsReducer(
       state as ArticleDetailsSchema,
      //  @ts-expect-error
       fetchArticleById.fulfilled(data)
     )
   ).toEqual({ data, error: undefined, isLoading: false });
 });

  test("test error", () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      error: "error",
      isLoading: true,
    };
    expect(
      articleDetailsReducer(
        state as ArticleDetailsSchema,
        fetchArticleById.rejected
      )
    ).toEqual({ error: undefined, isLoading: false });
  });
});