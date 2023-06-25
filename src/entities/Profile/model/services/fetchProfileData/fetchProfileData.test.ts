import axios from "axios";
import { fetchProfileData } from "./fetchProfileData";
import { Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { userActions } from "@/entities/User";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";


 const data = {
   username: "admin",
   age: 22,
   country: Country.Ukraine,
   lastname: "ulbi tv",
   first: "asd",
   city: "aboba",
   currency: Currency.USD,
 };


describe("fetchProfileData", () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;
  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });
  test("success", async () => {

    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('1');

    
    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data)

  });

  test("error", async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');
   expect(result.meta.requestStatus).toBe("rejected");
  });
});
