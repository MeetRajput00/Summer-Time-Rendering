const fs = require('fs');

function getDimensions(filePath) {
  const buffer = Buffer.alloc(24);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 24, 0);
  fs.closeSync(fd);
  
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  console.log(`${filePath}: ${width}x${height}`);
}

getDimensions(process.argv[2]);
