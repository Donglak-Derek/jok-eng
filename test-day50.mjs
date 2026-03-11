import { readFileSync } from 'fs';
import { resolve } from 'path';

const jsonPath = resolve('src/data/raw_missions/missions.json');
const rawData = readFileSync(jsonPath, 'utf-8');
const missions = JSON.parse(rawData);

const day50 = missions.find(m => m.day === 50);
console.log(day50);
