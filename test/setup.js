// Setup Jest environment
require('dotenv').config();

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  process.env.NODE_ENV = 'development';
});