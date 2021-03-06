import { readFileSync } from 'fs';
import Ajv from 'ajv';
import { createValidator } from '../src/api-validator';

describe('Ensure Test Payloads conform to API', () => {
  let validateFn: Ajv.ValidateFunction;

  beforeAll(() => {
    validateFn = createValidator();
  });

  it('should execute tests in the right folder', () => {
    expect(__dirname).toMatch(/tests$/);
  });

  it('should validate small-payload.json', () => {
    const basicTestData = JSON.parse(
      readFileSync(`${__dirname}/small-payload.json`).toString());

    const result = validateFn(basicTestData);
    if (!result) {
      console.error(validateFn.errors);
    }
    expect(result).toBeTruthy();
  });

  it('should validate large-payload.json', () => {
    const basicTestData = JSON.parse(
      readFileSync(`${__dirname}/large-payload.json`).toString());

    const result = validateFn(basicTestData);
    if (!result) {
      console.error(validateFn.errors);
    }
    expect(result).toBeTruthy();
  });
});
