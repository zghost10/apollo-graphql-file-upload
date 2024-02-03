import express from 'express'
import cors from 'cors'
import { graphqlUploadExpress } from 'graphql-upload-ts'

class App {
  server

  constructor () {
    this.server = express()

    this.server.use(
      '/gql',
      graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 })
    )
    this.server.use(express.json())
    this.server.use(cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true
    }))
  }
}

export const app = new App().server