describe("Movie Review Modal", () => {
  it("opens ReviewModal when Write a Review is clicked", () => {
    cy.visit("/movie/533533");
    cy.contains("Write a Review").click();
    cy.get("[data-cy='review-modal']", { timeout: 10000 }).should("exist");
  });
});
