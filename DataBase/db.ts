import { Database } from "https://deno.land/x/denodb/mod.ts"
const db = new Database("mysql", {
  host: "eu-cdbr-west-03.cleardb.net",
  username: "b67dbbc4ccbcd6",
  password: "01c94caa",
  database: "heroku_888212547d3003c",
})

export default db