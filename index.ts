import "reflect-metadata";
import express from 'express';
import router from './routes';
import { createConnection } from "typeorm";

const app = express();

createConnection({
    type: "mysql",
    host: "localhost",     // Your MySQL host
    port: 3306,            // MySQL port
    username: "root",      // MySQL username
    password: "",  // MySQL password
    database: "assessment-respond-io",    // MySQL database name
    entities: [            // Specify your entity classes
        "./entities/*.ts"
    ],
    synchronize: true,     // Auto-create tables based on entities (only for development)
}).then(connection => {
    console.log("Connected to database");
}).catch(error => {
    console.error("Database connection error:", error);
});

app.use('/api', router)

const port = process.env.PORT || 5001;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});