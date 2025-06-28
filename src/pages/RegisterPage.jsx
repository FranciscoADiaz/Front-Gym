import FormC from '../components/forms/FormC'
import { useChangeTitle } from '../helpers/useChangeTitlePage'

const RegisterPage = () => {
  useChangeTitle('registrarse')
  return (
    <>
      <FormC idPage='registrarse' />
    </>
  )
}

export default RegisterPage
