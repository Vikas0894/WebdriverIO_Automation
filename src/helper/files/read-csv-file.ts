import { readFileSync } from 'fs';

import parse from 'csv-parse/lib/sync';

export const readCsvFile = (path: string): Array<any> => parse(readFileSync(path), { columns: true });
