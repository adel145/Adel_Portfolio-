import fs from 'fs';
import path from 'path';

function getFolderStructure(dir, prefix = '') {
  const files = fs.readdirSync(dir);
  let structure = '';

  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const prefixWithLine = `${prefix}${isLast ? '└── ' : '├── '}`;
    structure += `${prefixWithLine}${file}\n`;

    if (fs.statSync(fullPath).isDirectory()) {
      const nextPrefix = `${prefix}${isLast ? '    ' : '│   '}`;
      structure += getFolderStructure(fullPath, nextPrefix);
    }
  });

  return structure;
}

const rootDir = './'; // Specify the folder you want to list
const folderStructure = getFolderStructure(rootDir);

fs.writeFileSync('folderStructure.txt', folderStructure);
console.log('Folder structure saved to folderStructure.txt');
