import { shallow } from 'enzyme';
import React from 'react';
import SidebarUserTab from './SidebarUserTab';

describe('Component SidebarUserTab', () => {
  const onClickMock = jest.fn();
  const props = {
    name: 'USER_NAME',
    image: 'USER_ICON_IMG',
    info: 'USER_INFO',
    onClick: onClickMock,
  };

  describe('renders properly', () => {
    it('renders', () => {
      const component = shallow(<SidebarUserTab {...props}/>);
      expect(component.text());
    });
  });
});