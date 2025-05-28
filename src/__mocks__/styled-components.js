const React = require('react');

const styled = (tag) => {
  return (strings, ...interpolations) => {
    return React.forwardRef((props, ref) => {
      return React.createElement(tag, { ...props, ref });
    });
  };
};

const htmlTags = [
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'button',
  'input',
  'form',
  'label',
  'a',
  'img',
  'ul',
  'li',
  'section',
  'article',
  'header',
  'footer',
  'nav',
  'main',
  'aside',
  'figure',
  'figcaption',
  'blockquote',
  'pre',
  'code',
];

htmlTags.forEach((tag) => {
  styled[tag] = styled(tag);
});

module.exports = {
  __esModule: true,
  default: styled,
  createGlobalStyle: jest.fn(() => () => null),
  css: jest.fn(() => ''),
  keyframes: jest.fn(() => ''),
  ThemeProvider: ({ children }) => children,
};
