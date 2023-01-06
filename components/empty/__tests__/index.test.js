import React from 'react';
import { mount } from 'enzyme';
import Empty from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Empty', () => {
  mountTest(Empty);

  it('image size should change', () => {
    const wrapper = mount(<Empty imageStyle={{ height: 20 }} />);
    expect(wrapper.find('.wmstool-empty-image').props().style.height).toBe(20);
  });

  it('description can be false', () => {
    const wrapper = mount(<Empty description={false} />);
    expect(wrapper.find('.wmstool-empty-description').length).toBe(0);
  });
});
