describe("Timer Application", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("creates and manages a timer", () => {
    // Create new timer
    cy.get('input[type="text"]').type("Test Timer");
    cy.get('input[type="number"]').type("1");
    cy.contains("button", "Add Timer").click();

    // Verify timer was created
    cy.contains("Test Timer").should("exist");
    cy.contains("1:00").should("exist");

    // Test timer controls
    cy.contains("button", "Pause").click();
    cy.contains("button", "Start").should("exist");

    cy.contains("button", "Restart").click();
    cy.contains("1:00").should("exist");

    cy.contains("button", "Delete").click();
    cy.contains("Test Timer").should("not.exist");
  });

  it("persists schedule changes", () => {
    // Change schedule times
    cy.get('input[type="time"]').first().type("10:00");
    cy.get('input[type="time"]').last().type("16:00");

    // Reload page
    cy.reload();

    // Verify persistence
    cy.get('input[type="time"]').first().should("have.value", "10:00");
    cy.get('input[type="time"]').last().should("have.value", "16:00");
  });
});
