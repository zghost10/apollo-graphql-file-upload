import httpServer from "./index";
require('dotenv').config()

//Environment variables
const port = process.env.PORT

httpServer.listen(
  { port }, () => console.log(`     Express running on:   http://localhost:${port}/\n     Apollo running on:    http://localhost:${port}/gql`)
)