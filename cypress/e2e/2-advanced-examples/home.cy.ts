///<reference types="cypress" />

describe("Home page basic check", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the Home page and shows at least one slider", () => {
    cy.get("[data-cy='slider']", { timeout: 10000 }).should("exist");
    cy.get("[data-cy='slider']").first().find("img").should("exist");
  });
});
