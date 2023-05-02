import pgtools from 'pgtools';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
};

pgtools.createdb(config, process.env.POSTGRES_DB, function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  connection.end();
  console.log(`Banco de dados ${process.env.POSTGRES_DB} criado com sucesso!`);
});
