//my test
describe("Quotes app", () => {
    beforeEach(() => {
      
      cy.visit("http://localhost:3000");
    });
  
    it("sanity test to make sure our tests work", () => {
      expect(1 + 2).to.equal(3);
      expect(2 + 2).not.to.equal(5);
      expect({}).not.to.equal({}); 
      expect({}).to.eql({}); 
    });
  
    const homeBtn = () => cy.get("a");
    const pizzaBtn = () => cy.get("#order-pizza");
    const sizeDD = () => cy.get("#size-dropdown");
    const originalRed = () => cy.get(".sauces > :nth-child(1)");
    const bbqSauce = () => cy.get(".sauces > :nth-child(2)");
    const pep = () => cy.get(".toppings > :nth-child(1) > input");
    const cheese = () => cy.get(".toppings > :nth-child(2)> input");
    const pina = () => cy.get(".toppings > :nth-child(3)> input");
    const sausage = () => cy.get(".toppings > :nth-child(4)> input");
    const name = () => cy.get("#name-input > label > input");
    const special = () => cy.get("#special-text > label > input");
    const submitBtn = () => cy.get("#order-button");
  
    it("test our routing buttons", () => {
      homeBtn().should("exist").click();
      cy.url().should("eq", "http://localhost:3000/");
  
      pizzaBtn().should("exist").click();
      cy.url().should("eq", "http://localhost:3000/pizza");
  
      homeBtn().should("exist").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  
    it("test to see if we can add test to the name and special instructions boxes", () => {
      pizzaBtn().should("exist").click();
      cy.url().should("eq", "http://localhost:3000/pizza");
  
      submitBtn().should("be.disabled");
      name().should("have.value", "").type("Bob").should("have.value", "Bob");
      submitBtn().should("be.disabled");
  
      special()
        .should("have.value", "")
        .type("I'm Special")
        .should("have.value", "I'm Special");
    });
  
    it("test that you can select multiple toppings", () => {
      pizzaBtn().should("exist").click();
      cy.url().should("eq", "http://localhost:3000/pizza");
  
      pep()
        .should("be.enabled")
        .should("not.be.checked")
        .check()
        .should("be.checked");
  
      cheese()
        .should("be.enabled")
        .should("not.be.checked")
        .check()
        .should("be.checked");
  
      pina()
        .should("be.enabled")
        .should("not.be.checked")
        .check()
        .should("be.checked");
  
      sausage()
        .should("be.enabled")
        .should("not.be.checked")
        .check()
        .should("be.checked");
    });
  
    it("test that you can submit the form", () => {
      pizzaBtn().should("exist").click();
      cy.url().should("eq", "http://localhost:3000/pizza");
      submitBtn().should("be.disabled");
      sizeDD().select("large").should("have.value", "large");
      name().should("have.value", "").type("Bob").should("have.value", "Bob");
      submitBtn().should("be.enabled");
    });
  });
  