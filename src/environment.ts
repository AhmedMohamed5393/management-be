import * as dotenv from "dotenv";
import * as nodepath from "path";
dotenv.config();
const basedir = nodepath.dirname(require.main.filename);
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${basedir}/../.env.test`;
    break;
  case "production":
    path = `${basedir}/../.env.production`;
    break;
  default:
    path = `${basedir}/../.env.development`;
}
dotenv.config({ path });
export const PORT = process.env.PORT;
export const URI = process.env.URI;
export const USER_DBURI = process.env.USER_DBURI;
export const DEPT_DBURI = process.env.DEPT_DBURI;
