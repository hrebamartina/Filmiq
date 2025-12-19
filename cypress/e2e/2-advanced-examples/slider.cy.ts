it("has at least one movie poster", () => {
  cy.visit("/");
  cy.get("img").first().should("exist");
});
