import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: 'ts-jest',
  coverageProvider: "v8",
  testEnvironment: "jsdnodeom",
  testPathIgnorePatterns: ["/e2e/"],
  moduleDirectories: ['node_modules', 'src']
};

export default createJestConfig(config);
