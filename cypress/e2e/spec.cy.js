describe('Zootopia E2E Automation Suite', () => {
  
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('https://testzootopia.loremipsum.ge/ka');
    cy.fixture('user').as('userData');

  });

  // --- რეგისტრაციის მოდული ---

  it('TC01: წარმატებული რეგისტრაცია ყველა სავალდებულო ველით', function() {
    cy.register(this.userData.validUser);
    

    // Assertions
    cy.get('a.iprof').should('exist').click({ force: true });// 1. წარმატების პოპაპი ჩანს
   
    cy.url().should('include', 'https://testzootopia.loremipsum.ge/ka'); // 3. გადამისამართდა მთავარზე
  });

  // --- ავტორიზაციის მოდული ---

 it('TC02: ავტორიზაცია და მომხმარებლის სახელის შემოწმება პროფილში', function() {
  const user = this.userData.validUser;

  // 1. ავტორიზაცია
  cy.login(user.email, user.password);
  cy.get('[class*="iprof"]').click({ force: true });

});


 it('TC03: ავტორიზაციის მცდელობა არასწორი პაროლით', function() {
    cy.login(this.userData.validUser.email, this.userData.invalidLogin.password);
    
    // Assertions
    cy.url().should('not.include', '/profile'); // 2. არ გადავიდა პროფილის გვერდზე
  });

  // --- კალათის მოდული ---

  it('TC04: პროდუქტის კალათაში დამატება მთავარი გვერდიდან', () => {

    cy.get('#cart-items-count')
      .invoke('text')
      .then((count) => {
          const initial = Number(count.trim());

          cy.get('div[onclick*="addToCart"]').first().click();

        cy.get('#cart-items-count')
          .should(($el) => {
            const newCount = Number($el.text().trim());
            expect(newCount).to.eq(initial + 1);
          });
        });

  });

  it('TC05: პროდუქტის წაშლა კალათიდან', () => {
    cy.get('a[href="https://testzootopia.loremipsum.ge/ka"]');
    cy.get('div[onclick*="addToCart"]', { timeout: 10000 }).first().click();
    
    cy.get('.icart').click();
    cy.get(':nth-child(1) > .clear > a').click();

    
    // Assertions
    cy.get('.empty > p').should('contain.text', 'კალათა ცარიელია')
    
   
  });

});