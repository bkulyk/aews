const { describe, expect, it } = require('../bootstrap');
const deepCamelCaseKeys = require('../../src/lib/deep_camel_case_keys');

describe('lib/deep_camel_case_keys', () => {
  it('should do deep camel case keys conversion', async () => {
    const input = {
      TestLvOne: {
        TestLvTwo: 'CamelCaseString',
      },
      TestString: 'CamelCaseString',
    };

    const result = deepCamelCaseKeys(input);

    expect(result).to.deep.equal({
      testLvOne: {
        testLvTwo: 'CamelCaseString',
      },
      testString: 'CamelCaseString',
    });
  });
});
