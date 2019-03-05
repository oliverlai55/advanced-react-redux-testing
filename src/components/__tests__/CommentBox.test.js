import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapper;

beforeEach(() => {
  wrapper = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  // Mounting a full component DOM will affect other tests, so we need to unmounc it each time
  wrapper.unmount();
});

it('has a text area and a button', () => {
  expect(wrapper.find('textarea').length).toEqual(1);
  expect(wrapper.find('button').length).toEqual(1);
});

// describe limit the scope of each beforeEach statement
describe('the text area', () => {
  beforeEach(() => {
    // simulate has a bunch of options to simulate
    wrapper.find('textarea').simulate('change', {
      target: { value: 'new comment' }
    });
    // Force component re-renders so it has new value
    wrapper.update();
  });

  it('has a text area that users can type in', () => {
    expect(wrapper.find('textarea').prop('value')).toEqual('new comment');
  });

  // submitting form empties text area
  // simulate submit event on the form itself, don't try to click the button
  it('has a text area that empties after form submits', () => {
    wrapper.find('form').simulate('submit');
    wrapper.update();
    expect(wrapper.find('textarea').prop('value')).toEqual('');
  });
});
