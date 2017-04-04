import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { MarkdownPreview } from '../index';

const { describe, it } = global;

describe('MarkdownPreview', () => {
  it('should display markdown', () => {
    const text = '# Title';
    /* eslint-disable react/jsx-filename-extension */
    const wrapper = shallow(<MarkdownPreview value={text} />);
    expect(wrapper.html()).to.be.equal('<div><h1 id="title">Title</h1>\n</div>');
  });
});
