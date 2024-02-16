import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    moduleDirectories: ["node_modules", "<rootDir>"],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    }
}

export default jestConfig