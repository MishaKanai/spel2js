module.exports = {
  linters: {
    "**/*.+(js|jsx|ts|tsx)": [
      //      'eslint --fix',
      "prettier --write",
      "jest --modulePaths=src --findRelatedTests",
      "git add"
    ]
  }
};
