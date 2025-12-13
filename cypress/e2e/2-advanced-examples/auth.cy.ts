const VALID_EMAIL = "user1@gmail.com";
const VALID_PASSWORD = "111111";
const INVALID_EMAIL = "wrong@email.com";
const INVALID_PASSWORD = "wrongpassword";

describe("Authentication E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("header")
      .contains(/Log in|Sign In/i)
      .click();

    cy.get('[data-cy="auth-modal"]').as("authModal").should("be.visible");
  });

  context("Login Form Functionality", () => {
    it("1. should successfully log in a user with valid credentials and redirect", () => {
      cy.get("@authModal").find('[data-cy="login-email"]').type(VALID_EMAIL);
      cy.get("@authModal").find('[data-cy="login-password"]').type(VALID_PASSWORD);
      cy.get("@authModal").find('[data-cy="login-submit"]').click();

      cy.get('[data-cy="auth-modal"]').should("not.exist");

      cy.get("header").contains("Log Out").should("be.visible");
    });

    it("2. should display an error message for invalid login credentials", () => {
      cy.get("@authModal").find('[data-cy="login-email"]').type(INVALID_EMAIL);
      cy.get("@authModal").find('[data-cy="login-password"]').type(INVALID_PASSWORD);
      cy.get("@authModal").find('[data-cy="login-submit"]').click();

      cy.get("@authModal")
        .find('[data-cy="login-error"]')
        .should("be.visible")
        .and("not.be.empty");

      cy.get('[data-cy="auth-modal"]').should("be.visible");
    });
  });

  context("Signup Form Functionality", () => {
    beforeEach(() => {
      cy.get("@authModal").find('[data-cy="switch-to-signup"]').click();
      cy.get("@authModal").should("be.visible");
    });

    it("3. should display error when passwords do not match", () => {
      cy.get("@authModal").find('[data-cy="signup-email"]').type("temp_user@test.com");
      cy.get("@authModal").find('[data-cy="signup-password"]').type("SecurePass123");
      cy.get("@authModal").find('[data-cy="signup-confirm-password"]').type("DifferentPass456");
      cy.get("@authModal").find('[data-cy="signup-submit"]').click();

      cy.get("@authModal")
        .find('[data-cy="signup-error"]')
        .should("be.visible")
        .and("contain", "Passwords do not match");

      cy.get('[data-cy="auth-modal"]').should("be.visible");
    });

    it("4. should successfully submit signup form (passwords match) and close modal", () => {
      const newEmail = `user${Date.now()}@test.com`;
      cy.get("@authModal").find('[data-cy="signup-email"]').type(newEmail);
      cy.get("@authModal").find('[data-cy="signup-password"]').type(VALID_PASSWORD);
      cy.get("@authModal").find('[data-cy="signup-confirm-password"]').type(VALID_PASSWORD);
      cy.get("@authModal").find('[data-cy="signup-submit"]').click();

      cy.get('[data-cy="auth-modal"]').should("not.exist");
    });
  });
});
