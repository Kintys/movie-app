module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.spec.json',
            stringifyContentPathRegex: '\\.html$'
        }
    },
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular'
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass|svg)$': 'identity-obj-proxy',
        '@/(.*)': '<rootDir>/src/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^assets/(.*)$': '<rootDir>/src/assets/$1',
        '^styles/(.*)$': '<rootDir>/src/styles/$1'
    }
}
