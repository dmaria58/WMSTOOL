import pkg from '../package.json';

const testDist = process.env.LIB_DIR === 'dist';

describe('wmstool dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    const wmstool = testDist ? require('../dist/wmstool') : require('../components'); // eslint-disable-line global-require
    expect(Object.keys(wmstool)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('should have wmstool.version', () => {
      const wmstool = require('../dist/wmstool'); // eslint-disable-line global-require
      expect(wmstool.version).toBe(pkg.version);
    });
  }
});
