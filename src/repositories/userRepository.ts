import connection from '../database/connection.js';

export default interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  image: string;
  is_adm: boolean;
}

export async function create(userDate: User): Promise<void> {
  const { name, email, password, image } = userDate;
  try {
    await connection.query(
      `INSERT INTO users(name, email, password, image) VALUES ($1, $2, $3, $4)`,
      [name, email, password, image],
    );
  } catch (err) {
    console.log(err);
  }
}

export async function findByEmail(email: string): Promise<User> {
  try {
    const response = await connection.query(
      'SELECT * FROM users WHERE email=$1',
      [email],
    );
    return response.rows[0];
  } catch (err) {
    console.log(err);
  }
}

export async function findById(userId: number): Promise<User> {
  const response = await connection.query(
    'SELECT id, name, image FROM users where id=$1',
    [userId],
  );
  return response.rows[0];
}
