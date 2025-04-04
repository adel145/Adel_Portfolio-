import fs from 'fs';
import path from 'path';
import readline from 'readline';

function getFolderStructure(dir, prefix = '', ignoreList = []) {
  const files = fs.readdirSync(dir);
  let structure = '';

  files.forEach((file, index) => {
    const fullPath = path.resolve(dir, file); // Ensure absolute path
    const isLast = index === files.length - 1;
    const prefixWithLine = `${prefix}${isLast ? '└── ' : '├── '}`;

    // Skip ignored folders
    if (ignoreList.some(ignorePath => fullPath.startsWith(ignorePath))) {
      console.log(`Skipping: ${fullPath}`);
      return;
    }

    structure += `${prefixWithLine}${file}\n`;

    if (fs.statSync(fullPath).isDirectory()) {
      const nextPrefix = `${prefix}${isLast ? '    ' : '│   '}`;
      structure += getFolderStructure(fullPath, nextPrefix, ignoreList);
    }
  });

  return structure;
}

// Prompt user for folders to ignore
const ignoredFolders = []; // List to store ignored folder paths
const rootDir = './'; // Specify the folder you want to list

// Function to prompt user for folder paths to ignore
async function addIgnoredFolder() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const answer = await new Promise(resolve =>
      rl.question('Enter a folder path to ignore (or press Enter to finish): ', resolve)
    );

    if (!answer.trim()) {
      rl.close();
      break;
    }

    const resolvedPath = path.resolve(rootDir, answer.trim());
    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
      ignoredFolders.push(resolvedPath);
      console.log(`Added to ignore list: ${resolvedPath}`);
    } else {
      console.log('Invalid folder path. Please try again.');
    }
  }

  // Generate folder structure after collecting ignore list
  const folderStructure = getFolderStructure(rootDir, '', ignoredFolders);
  fs.writeFileSync('folderStructure.txt', folderStructure);
  console.log('Folder structure saved to folderStructure.txt');
}

addIgnoredFolder();
