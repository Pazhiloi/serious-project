import { ThunkConfig } from "@/app/providers/StoreProvider";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { articlePageActions } from "../../slices/articlePageSlice";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  "articlePage/initArticlesPage",
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      dispatch(articlePageActions.initState());
      dispatch(
        fetchArticlesList({
          page: 1,
        })
      );
    }
  }
);