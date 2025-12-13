describe("Header Login Test", () => {
  it("shows login button for anonymous user", () => {
    cy.visit("/");

    cy.get("button").contains("Log In").should("exist");
  });
});
