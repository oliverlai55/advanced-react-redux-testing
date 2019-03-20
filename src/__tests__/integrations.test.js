import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', done => {
  // attempt to render the entire app

  const wrapper = mount(
    <Root>
      <App />
    </Root>
  );
  //find fetchComments button and lcick it
  wrapper.find('.fetch-comments').simulate('click');

  //Expect to find a list of comments, 500 Lis
  // setTimeout(() => {
  //   // have to explicitly update component after we go fetchComments and get comments in redux store.
  //   wrapper.update();
  //   expect(wrapper.find('li').length).toEqual(2);

  //   // this is how we tell jest to wait and when we're ready with setTimeout, call done to complete test
  //   done();
  //   wrapper.unmount();
  // }, 100);

  moxios.wait(() => {
    wrapper.update();
    expect(wrapper.find('li').length).toEqual(2);
    done();
    wrapper.unmount();
  });
});
