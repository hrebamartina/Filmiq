describe("Signup and Logout E2E Test", () => {
  const VALID_PASSWORD_LOCAL = "111111"; 

  beforeEach(() => {
    cy.visit("/");
    cy.get("header").contains(/Log in|Sign In/i).click();
    cy.get('[data-cy="auth-modal"]').as("authModal").should("be.visible");
  });

  it("should signup a new user, see logout button, and log out successfully", () => {
    cy.get("@authModal").find('[data-cy="switch-to-signup"]').click();

    const newEmail = `user${Date.now()}@test.com`;

    cy.get("@authModal").find('[data-cy="signup-email"]').type(newEmail);
    cy.get("@authModal").find('[data-cy="signup-password"]').type(VALID_PASSWORD_LOCAL);
    cy.get("@authModal").find('[data-cy="signup-confirm-password"]').type(VALID_PASSWORD_LOCAL);
    cy.get("@authModal").find('[data-cy="signup-submit"]').click();

    cy.get('[data-cy="auth-modal"]').should("not.exist");
    cy.get("header").contains("Log Out").should("be.visible");
    cy.get("header").contains("Log Out").click();
    cy.get("header").contains(/Log in|Sign In/i).should("be.visible");
  });
});
