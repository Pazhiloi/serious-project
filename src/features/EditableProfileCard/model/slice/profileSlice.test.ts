import { Country } from "@/entities/Country"
import { Currency } from "@/entities/Currency"
import { ProfileSchema } from "../types/EditableProfileCardSchema"
import { profileActions, profileReducer } from "./profileSlice"
import { ValidateProfileError } from "../const/const";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

const data = {
  username: "admin",
  age: 30,
  country: Country.Ukraine,
  lastname: "Ivanov",
  first: "Ivan",
  city: "Moscow",
  currency: Currency.USD,
};
describe("profileSlice.test", () => {
  test("test set readonly", () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ readonly: true });
  });
  test("test cancel edit", () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: "" } };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });
  test("test update profile", () => {
    const state: DeepPartial<ProfileSchema> = {
      form: { username: "123", age: 15 },
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: "123", age: 10 })
      )
    ).toEqual({
      form: { username: "123", age: 10 },
    });
  });
  test("test update profile service pending", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({
      isLoading: true,
      validateError: undefined,
    });
  });
  test("test update profile service fullfiled", () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, "")
      )
    ).toEqual({
      isLoading: false,
      validateErrors: undefined,
      readonly: true,
      data,
      form: data,
    });
  });
});