import { selectByTestId } from "cypress/helpers/selectByTestId";

describe("routing", () => {
  describe("user is not authed", () => {
    it("navigate to the main page", () => {
      cy.visit("/");
      cy.get(selectByTestId("MainPage")).should("exist");
    });
    it("navigate to the profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("MainPage")).should("exist");
    });
    it("navigate to the unexist router", () => {
      cy.visit("/prdsdsdsdsdsdsd");
      cy.get(selectByTestId("NotFoundPage")).should("exist");
    });
  });
  describe("user is authed", () => {
    beforeEach(() => {
      cy.login();
    });
    it("navigate to the profile page", () => {
      cy.visit("/profile/1");
      cy.get(selectByTestId("ProfilePage")).should("exist");
    });

    it("navigate to the article list", () => {
      cy.visit("articles");
      cy.get(selectByTestId("ArticlesPage")).should("exist");
    });
  });
});
