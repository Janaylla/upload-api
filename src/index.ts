import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import cors from 'cors'
import { router } from "./router/Router";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const server = app.listen(process.env.PORT || 3001, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run the server.`);
  }
});