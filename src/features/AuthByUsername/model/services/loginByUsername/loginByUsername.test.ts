import axios from 'axios';
import { loginByUsername } from "./loginByUsername";
import { Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername', () => {
  let dispatch: Dispatch;
  let getState: () =>  StateSchema;
  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  })
  test('', async () => {

    mockedAxios.post.mockReturnValue(Promise.resolve({data: {username: '123', id: '1'}}));

    const action = loginByUsername({username: '123', password: '123'})
    const result = await action(dispatch, getState, undefined)
    console.log(result);
  });
});