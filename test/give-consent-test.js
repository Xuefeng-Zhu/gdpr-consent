const Nightmare = require('nightmare');
const chai = require('chai');

chai.should();

describe('Give consent page', () => {
  let nightmare;
  beforeEach(() => {
    nightmare = new Nightmare()
      .goto('http://localhost:8000/#/give-consent');
  });

  afterEach(async () => {
    await nightmare.end();
  });

  it('should render correctly', async () => {
    const nameInput = await nightmare.exists('input[name="name"');
    const emailInput = await nightmare.exists('input[name="email"');
    const agreeText = await nightmare.exists('p[class*="agree"]');
    const newsletterCheck = await nightmare.exists('input[value="newsletter"]');
    const adsCheck = await nightmare.exists('input[value="ads"]');
    const statisticsCheck = await nightmare.exists('input[value="statistics"]');
    const giveConsentBtn = await nightmare.exists('button[class*="giveConsent"]');

    nameInput.should.be.true;
    emailInput.should.be.true;
    agreeText.should.be.true;
    newsletterCheck.should.be.true;
    adsCheck.should.be.true;
    statisticsCheck.should.be.true;
    giveConsentBtn.should.be.true;
  });

  it('should submit consent correctly', async () => {
    await nightmare
      .insert('input[name="name"', 'Frank')
      .insert('input[name="email"', 'frank@gmail.com')
      .check('input[value="newsletter"')
      .click('button[class*="giveConsent"]');


    const url = await nightmare.url();
    url.should.be.equal('http://localhost:8000/#/consents');
  });
});
