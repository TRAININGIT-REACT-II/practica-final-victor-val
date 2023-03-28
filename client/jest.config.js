module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/../../../__mocks__/styleMock.js",
  },
};
