import { useChangeTitle } from '../helpers/useChangeTitlePage'
import FormC from '../components/forms/FormC'

const RecuperarContrasenia = () => {
  useChangeTitle('recuperarcontrasenia')
  return (
    <>
      <FormC idPage='recuperarcontrasenia' />
    </>
  )
}

export default RecuperarContrasenia
