import FormC from '../components/forms/FormC'
import { useChangeTitle } from '../helpers/useChangeTitlePage'

const LoginPage = () => {
  useChangeTitle('iniciarsesion')
  return (
    <>
      <FormC idPage='iniciarsesion' />
    </>
  )
}

export default LoginPage
