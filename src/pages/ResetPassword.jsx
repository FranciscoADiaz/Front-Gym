import FormResetPassword from "../components/forms/FormResetPassword";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const ResetPassword = () => {
  useChangeTitle("restablecercontrasenia");
  return <FormResetPassword />;
};

export default ResetPassword;



