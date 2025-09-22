
// Wall Deva test file

const {expect} = require('chai')
const WallDeva = require('./index.js');

describe(WallDeva.me.name, () => {
  beforeEach(() => {
    return WallDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(WallDeva).to.be.an('object');
    expect(WallDeva).to.have.property('agent');
    expect(WallDeva).to.have.property('vars');
    expect(WallDeva).to.have.property('listeners');
    expect(WallDeva).to.have.property('methods');
    expect(WallDeva).to.have.property('modules');
  });
})
