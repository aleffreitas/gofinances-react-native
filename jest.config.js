module.exports = { 
  preset: "jest-expo",

  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    'jest-styled-components'
  ],

  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components'
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/**/*.spec.tsx'
  ],

  coverageReporters: [
    'lcov'
  ]
}