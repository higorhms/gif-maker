const { parse } = require('fast-csv');
const fs = require('fs').promises;
const path = require('path');
const City = require('../models/city.model');

async function bulkCities(cities) {
  const bulkOps = cities.map((city) => {
    if (Number.isNaN(city.population)) return null;

    return ({
      updateOne: {
        filter: { name: city.name, state: city.state },
        update: { $set: city },
        upsert: true,
      },
    });
  }).filter(Boolean);
  return City.bulkWrite(bulkOps);
}

async function convertCsvDataToCities() {
  const filePath = path.join(__dirname, 'bulk-city-populations.csv');

  const csvData = await fs.readFile(filePath, 'utf-8');

  const results = await new Promise((resolve, reject) => {
    const cities = [];

    const stream = parse({ headers: ['name', 'state', 'population'], renameHeaders: true })
      .on('data', (data) => cities.push({
        ...data,
        population: Number(data.population),
      }))
      .on('error', (error) => reject(error))
      .on('end', () => resolve(cities));

    stream.write(csvData);
    stream.end();
  });

  if (results instanceof Error) {
    throw results;
  }

  return results;
}

async function initData() {
  const cities = await convertCsvDataToCities();
  await bulkCities(cities);
}

module.exports = { initData };
