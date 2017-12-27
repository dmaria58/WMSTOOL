import React from 'react';
import { shallow } from 'enzyme';
import Spin from '..';

describe('Spin', () => {
  it('should only affect the spin element when set style to a nested <Spin>xx</Spin>', () => {
    const wrapper = shallow(
      <Spin style={{ background: 'red' }}>
        <div>content</div>
      </Spin>
    );
    expect(wrapper.find('.ant-spin-nested-loading').at(0).prop('style')).toBe(null);
    expect(wrapper.find('.ant-spin').at(0).prop('style').background).toBe('red');
  });

  it('should render custom indicator when it\'s set', () => {
    const customIndicator = <div className="custom-indicator" />;
    const wrapper = shallow(
      <Spin indicator={customIndicator} />
    );
    expect(wrapper.contains(customIndicator)).toEqual(true);
  });
});
