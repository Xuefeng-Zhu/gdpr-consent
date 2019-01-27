const Nightmare = require('nightmare');
const chai = require('chai');

chai.should();

describe('Consents page', () => {
  let nightmare;
  beforeEach(() => {
    nightmare = new Nightmare()
      .goto('http://localhost:8000/#/consents');
  });

  afterEach(async () => {
    await nightmare.end();
  });

  it('should render correctly', async () => {
    const table = await nightmare.exists('table');
    const correctHeader = await nightmare.evaluate(() => {
      const headerCols = document.querySelectorAll('table thead th');

      return headerCols[0].textContent === 'Name' &&
      headerCols[1].textContent === 'Email' &&
      headerCols[2].textContent === 'Consent given for';
    });
    const tableRowCount = await nightmare.evaluate(() => {
      return document.querySelectorAll('table tbody tr').length;
    });
    const pagination = await nightmare.exists('.rc-pagination ');
    const pageCount = await nightmare.evaluate(() => {
      return document.querySelectorAll('.rc-pagination-item').length;
    });
    const page1Active = await nightmare.exists('.rc-pagination-item-1.rc-pagination-item-active');

    table.should.be.true;
    correctHeader.should.be.true;
    tableRowCount.should.be.equal(2);
    pagination.should.be.true;
    pageCount.should.be.equal(4);
    page1Active.should.be.true;
  });

  it('should change page correctly', async () => {
    await nightmare
      .click('.rc-pagination-item-2');

    const url = await nightmare.url();
    const page2Active = await nightmare.exists('.rc-pagination-item-2.rc-pagination-item-active');

    url.should.be.equal('http://localhost:8000/#/consents?page=2');
    page2Active.should.be.true;
  });
});
