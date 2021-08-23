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
    it('renders props', () => {
      const component = shallow(<SidebarUserTab {...props}/>);

      expect(component.text().includes('USER_NAME')).toBe(true);
      expect(component.text().includes('USER_INFO')).toBe(true);
      expect(component.find('img').first().prop('src')).toBe('USER_ICON_IMG');
    });
  });

  describe('component logic', () => {
    it('calls click handler when clicked', () => {
      const component = shallow(<SidebarUserTab {...props}/>);

      component.find('#sidebar-user-profile').simulate('click');

      expect(onClickMock).toBeCalled();
    });
  });
});