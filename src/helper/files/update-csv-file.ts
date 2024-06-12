import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

interface CsvData {
    [key: string]: any;
}

/**
 * Appends data to a CSV file. If the file does not exist, it creates one.
 * @param filePath - The path to the CSV file.
 * @param data - The array of objects to write.
 * @param headers - The headers for the CSV file.
 */
export const appendToCSV = (filePath: string, data: CsvData[], headers: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if the file exists
        const fileExists = fs.existsSync(filePath);

        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: headers.map(header => ({ id: header, title: header })),
            append: fileExists, // Append mode if the file already exists
        });

        csvWriter.writeRecords(data)
            .then(() => resolve())
            .catch((error: any) => reject(error));
    });
};
