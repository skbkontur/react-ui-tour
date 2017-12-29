import * as React from 'react';
import {shallow} from 'enzyme';

import {Highlight} from '../src/tour/components/highlight/Highlight';

describe('Highlight testing', () => {
  const customHighlight = <div style={{border: '3px solid red', padding: '10px'}}/>;

  it('should render a Highlight', () => {
    const wrapper = shallow(<Highlight
      pos={document.documentElement.getBoundingClientRect()}
      root={customHighlight}
    />);

    expect(wrapper.prop('children')).toEqual(customHighlight);
  });

  it('should render a Highlight with backgroundColor and rootOffset', () => {
    const wrapper = shallow(<Highlight
      pos={document.documentElement.getBoundingClientRect()}
      root={customHighlight}
      backgroundColor='red'
      rootOffset={10}
    />);

    expect(wrapper.prop('style').padding).toEqual(10);
    expect(wrapper.prop('style').borderColor).toEqual('red');
  });
});

