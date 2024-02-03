import { GraphQLError } from "graphql"
import ShortUniqueId from "short-unique-id"
import { ReadStream } from "fs"
import streamToBlob from 'stream-to-blob'
import { files } from "../lib/s3"

export const Mutation = {
  createBlogPost: async (parent: any, {content, groupSlug, attachments}: any, contextValue: any) => {
    try {
      let urls: string[] = []
      const unique = new ShortUniqueId({ length: 32 })
      const id = unique.randomUUID()

      for(const attachment of await attachments){
        const { createReadStream, filename, mimetype, encoding } = attachment.file;
        const stream: ReadStream = createReadStream();
        const blob = await streamToBlob(stream, mimetype)
        const res = await files.upload(blob, filename.split(".")[0], `groups/${groupSlug}/${id}`)
        
        if(res){
          urls.push(res)
        }else{
          throw new GraphQLError("An error ocurred while trying to upload file!", {
            extensions: { 
              code: 'INTERNAL',
              http: {
                status: 500
              }
            },
          })
        }
      }

      //Salve o post com as urls dos arquivos no Amazon S3

    } catch (error: any) {
      throw new GraphQLError(error??"An error ocurred while trying to create a group post!", {
        extensions: {
          code: 'INTERNAL',
          http: {
            status: 500
          }
        },
      })
    }
  }
}