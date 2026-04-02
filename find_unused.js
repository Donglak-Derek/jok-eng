const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js']) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath, exts));
        } else {
            if (exts.includes(path.extname(fullPath))) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

const componentFiles = fs.readdirSync(componentsDir)
    .filter(f => f.endsWith('.tsx') && fs.statSync(path.join(componentsDir, f)).isFile())
    .map(f => f.replace('.tsx', ''));

const allSourceFiles = getFiles(srcDir);

const usages = {};
componentFiles.forEach(c => usages[c] = []);

allSourceFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    componentFiles.forEach(comp => {
        // Regex to find import ComponentName from ... or import { ComponentName } from ...
        const regex = new RegExp(`\\b${comp}\\b`, 'g');
        if (regex.test(content)) {
            usages[comp].push(file);
        }
    });
});

const unused = [];
for (let [comp, files] of Object.entries(usages)) {
    // If a component is only referenced in its own file, it is unused
    const otherFilesCount = files.filter(f => !f.endsWith(`/${comp}.tsx`)).length;
    if (otherFilesCount === 0) {
        unused.push(comp);
    }
}

console.log("=== UNUSED COMPONENTS ===");
unused.forEach(comp => console.log(comp + ".tsx"));
