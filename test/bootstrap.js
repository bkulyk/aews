process.env.NODE_ENV = 'test';

const Lab = require('lab');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiDateString = require('chai-date-string');

chai.use(chaiAsPromised);
chai.use(chaiDateString);

const lab = Lab.script();
const {
  describe,
  it,
  after,
  before,
  beforeEach,
} = lab;

module.exports = {
  lab,
  describe,
  it,
  expect: chai.expect,
  afterAll: after,
  beforeAll: before,
  beforeEach,
};
