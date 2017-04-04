import React from 'react';

export default class MarkdownInput extends React.Component {
  render() {
    const { onChange, value, placeholder, className } = this.props;
    return (
      <textarea
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref="textareaRef"
        className={className}
      />
    );
  }
}

MarkdownInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
};
