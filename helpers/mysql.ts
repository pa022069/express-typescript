import mysql from "mysql";
import conf from "./config";

export const createConnection = () => mysql.createConnection(conf.db);
