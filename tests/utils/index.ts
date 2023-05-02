import connection from '../../src/database/connection';
import fs from 'fs';

export async function clearDB(): Promise<void> {
  try {
    await connection.query('BEGIN');
    await connection.query('TRUNCATE shopping CASCADE');
    await connection.query('TRUNCATE products CASCADE');
    await connection.query('TRUNCATE users CASCADE');
    await connection.query('TRUNCATE sessions CASCADE');
    await connection.query('COMMIT');
  } catch (err) {
    await connection.query('ROLLBACK');
  } finally {
    await connection.end();
  }
}

export function deleteFile(path: string): void {
  fs.unlink('uploads/' + path, (err) => {
    if (err) console.error(err);
  });
}
