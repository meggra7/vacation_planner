// Import server access and needed dependencies
const server = require('../src/server/index');
import { getWeatherForecast } from '../src/server/index.js'
import 'regenerator-runtime/runtime';

// Server test 1
test('Getting weather forecast for lat/lon pair returns 16 days of weather', async () => {
    const response = await getWeatherForecast(40.71427, -75.4999);
    expect(response).toHaveLength(16);
});

// Server test 2
test('Getting weather forecast for lat/lon pair returns date, low temp, high temp, code, and description', async () => {
    const response = await getWeatherForecast(40.71427, -75.4999);
    expect(response[0]).toHaveProperty('code');
    expect(response[0]).toHaveProperty('low');
    expect(response[0]).toHaveProperty('high');
    expect(response[0]).toHaveProperty('code');
    expect(response[0]).toHaveProperty('description');
});