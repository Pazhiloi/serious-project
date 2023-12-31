import { getUserAuthData } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleDetailsData } from "@/entities/Article";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { fetchCommentsByArticleId } from "@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  void,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkApi) => {
  const { extra, rejectWithValue, getState, dispatch } = thunkApi;

  const userData = getUserAuthData(getState());
  const article = getArticleDetailsData(getState());
// @ts-ignore
  if (!userData || !text || !article) {
    return rejectWithValue("no data");

  }

  try {
    const response = await extra.api.post<Comment>("/comments", {
      articleId: article.id,
      userId: userData.id,
      text,
    });

    if (!response.data) {
      throw new Error();
    }
    
    dispatch(fetchCommentsByArticleId(article.id));
    return response.data;
  } catch (e) {
    return rejectWithValue("Error");
  }
});