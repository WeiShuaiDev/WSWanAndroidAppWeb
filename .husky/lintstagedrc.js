module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{vue,css,scss,postcss,less}": ["stylelint --fix --allow-empty-input"],
  "*.md": ["prettier --write"]
};
