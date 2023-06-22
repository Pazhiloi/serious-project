import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileForm } from "./getProfileForm";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
describe("getProfileForm", () => {
  test("should return formData", () => {
    const data = {
      username: "admin",
      age: 22,
      country: Country.Ukraine,
      lastname: "ulbi tv",
      first: "asd",
      city: "aboba",
      currency: Currency.USD,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        form : data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
