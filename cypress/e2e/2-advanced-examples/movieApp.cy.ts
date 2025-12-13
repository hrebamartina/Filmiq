describe("Movie App – smoke e2e tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("App loads without crashing", () => {
    cy.get("body").should("exist");
  });

  it("Header (nav) exists", () => {
    cy.get("nav").should("exist");
  });

  it("There is at least one link on the page", () => {
    cy.get("a").its("length").should("be.greaterThan", 0);
  });

  it("There is at least one button on the page", () => {
    cy.get("button").its("length").should("be.greaterThan", 0);
  });

  it("Images are rendered (movies posters, sliders etc)", () => {
    cy.get("img").its("length").should("be.greaterThan", 0);
  });

  it("TMDB API is called successfully", () => {
    cy.intercept("GET", "**/discover/movie**").as("getMovies");

    cy.visit("/");

    cy.wait("@getMovies").its("response.statusCode").should("eq", 200);
  });
});
