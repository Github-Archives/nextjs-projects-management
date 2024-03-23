module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["./setupTests.js"], // Relative path to setupTests.js
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
