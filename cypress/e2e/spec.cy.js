describe('Zootopia E2E Automation Suite', () => {
  
  beforeEach(() => {
  
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
    cy.get('div[onclick*="addToCart"]').first().click();
    
    
    // Assertions
    cy.get('[class="cart-items-count"]').should('not.contain', '0'); // 1. ქაუნთერი შეიცვალა
   
  });

  it('TC05: პროდუქტის წაშლა კალათიდან', () => {
    cy.get('a[href="https://testzootopia.loremipsum.ge/ka/cart"]');
   cy.get('[class*="clear"]').first().click();

    
    // Assertions
    cy.get('.cart-empty-msg').should('be.visible'); // 1. ჩანს შეტყობინება რომ კალათა ცარიელია
    cy.get('.total-price').should('contain', '0'); // 2. ჯამური ფასი განულდა
  });

});