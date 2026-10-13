import type { Config } from 'jest';

// This project is an ES module ("type": "module") and depends on ESM-only
// packages such as @ferlab/next, so Jest runs in ESM mode (useESM and
// extensionsToTreatAsEsm below). Jest's ESM support relies on Node's
// experimental VM modules, which is why the "test" and "test:watch" scripts in
// package.json set NODE_OPTIONS=--experimental-vm-modules. Without that flag,
// Jest falls back to CommonJS and fails with "Cannot use import statement
// outside a module". The resulting ExperimentalWarning in the output is expected.
const config: Config = {
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  // preset: 'ts-jest/presets/default-esm',
  // automock: true,
  rootDir: './',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],
};

export default config;
