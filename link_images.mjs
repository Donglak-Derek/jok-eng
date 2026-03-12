import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const missionsPath = path.resolve(__dirname, 'src/data/raw_missions/missions.json');

try {
    const data = fs.readFileSync(missionsPath, 'utf8');
    const missions = JSON.parse(data);

    let updatedCount = 0;

    for (let mission of missions) {
        const expectedImagePath = `/images/missions/day${mission.day}.png`;
        
        // Overwrite any existing imageUrl (like the day1.jpg we added earlier) 
        // with the new PNG files they just uploaded
        mission.imageUrl = expectedImagePath;
        updatedCount++;
    }

    fs.writeFileSync(missionsPath, JSON.stringify(missions, null, 2), 'utf8');
    console.log(`Successfully updated ${updatedCount} missions with new image URLs.`);
} catch (error) {
    console.error('Error updating missions:', error);
}
