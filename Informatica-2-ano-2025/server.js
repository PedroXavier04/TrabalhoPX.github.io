import dotenv from 'dotenv';
dotenv.config();

import app from './index.js';

const port = process.env.PORT || 3000;
// Define a porta do servidor, usando a variável de ambiente PORT ou 3000 como padrão

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
