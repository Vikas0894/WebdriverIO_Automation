import fs from 'fs';

interface SomeObject {
  [key: string]: any;
}

/**
 * Writes an array of objects to a CSV file.
 * @param filePath - The path to the CSV file.
 * @param data - The array of objects to write.
 * @param headers - The headers for the CSV file.
 */
export const writeCSV = (filePath: string, data: SomeObject[], headers: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);

    // Write the headers to the CSV file
    writeStream.write(headers.join(',') + '\n');

    // Write each object to the CSV file
    data.forEach((someObject) => {
      const newLine = headers.map(header => someObject[header] || '');
      writeStream.write(newLine.join(',') + '\n');
    });

    // End the write stream
    writeStream.end();

    // Handle stream events
    writeStream.on('finish', () => {
      console.log('Finished writing to CSV file');
      resolve();
    }).on('error', (err) => {
      console.log('Error writing to CSV file:', err);
      reject(err);
    });
  });
};
