"use strict";
// Copyright ©2000-2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:15514145251199788621 LICENSE.md
// Thursday, November 27, 2025 - 2:02:54 PM

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
