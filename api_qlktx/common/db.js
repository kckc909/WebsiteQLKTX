import mysql2 from 'mysql2';

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'website_qlktx',
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0         
});

export default db;
