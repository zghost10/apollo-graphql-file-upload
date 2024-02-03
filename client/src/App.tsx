import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'

const CREATE_POST = gql`
  mutation (
    $attachments: [Upload]
  ) {
    createGroupPost (
      attachments: $attachments
    ) {
      id content attachments
    }
  }
`

const App = () => {
  const { register, handleSubmit } = useForm()
  const [ createPost, { loading, error } ] = useMutation(CREATE_POST)

  const onSubmit = (formData: any) => createPost({
    variables: {
      attachments: formData.files
    }
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{
          display: "flex",
          flexDirection: "column"
        }}>
          <label htmlFor="files">
            Arquivos:
          </label>
          <input 
            id="files"
            {...register("files", { required: true })}
            accept="application/pdf, application/msword, image/png, image/jpg, image/jpeg, image/webp" type="file" multiple
          />
        </div>

        <button type="submit">
          Enviar
        </button>
      </form>
    </>
  )
}

export default App
