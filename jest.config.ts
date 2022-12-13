import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", //Path to our Next App, which is basically the root of our project, if your next app wasn't in the same directory as your jest config, then this value would be different
});

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
