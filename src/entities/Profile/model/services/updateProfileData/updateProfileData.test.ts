import { updateProfileData } from "./updateProfileData";
import { Dispatch } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { ValidateProfileError } from "../../types/profile";

const data = {
  username: "admin",
  age: 22,
  country: Country.Ukraine,
  lastname: "ulbi tv",
  first: "asd",
  city: "aboba",
  currency: Currency.USD,
};

describe("updateProfileData", () => {
  let dispatch: Dispatch;
  let getState: () => StateSchema;
  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });
  test("success", async () => {
     const thunk = new TestAsyncThunk(updateProfileData, {
       profile: {
         form: data,
       },
     });
    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual(data);
  });

  test("error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe("rejected");

    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });

  test("validate error", async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: "" },
      },
    });

    const result = await thunk.callThunk();
    expect(result.meta.requestStatus).toBe("rejected");

    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
});
