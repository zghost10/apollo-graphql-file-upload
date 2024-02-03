import { gql } from "apollo-server-express"

export const typeDefs = gql`
  scalar Date
  scalar Json
  scalar Upload

  type BlogPost {
    id: Int
    content: String
    attachments: [Json]
    createdAt: Date
    updatedAt: Date
    likes: [Json]
    comments: [Json]
  }

  type Query {
    hello: String
  }

  type Mutation {
    createBlogPost (
      attachments: [Upload]
    ): BlogPost
  }
`