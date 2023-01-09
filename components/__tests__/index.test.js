import * as antd from '..';

describe('wmstool', () => {
  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });
});
