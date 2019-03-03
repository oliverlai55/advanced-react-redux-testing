import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';

let wrapper;

beforeEach(() => {
  wrapper = mount(<CommentBox />);
});

afterEach(() => {
  // Mounting a full component DOM will affect other tests, so we need to unmounc it each time
  wrapper.unmount();
});

it('has a text area and a button', () => {
  expect(wrapper.find('textarea').length).toEqual(1);
  expect(wrapper.find('button').length).toEqual(1);
});

it('has a text area that users can type in', () => {
  // simulate has a bunch of options to simulate
  wrapper.find('textarea').simulate('change', {
    target: { value: 'new comment'}
  })
});