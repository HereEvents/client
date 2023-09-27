import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import RegisterForm from "../../components/RegisterForm";

function Registeretion() {

  const { setHeader } = useContext(headerContext);
  setHeader("דף הרשמה");

  const navigate = useNavigate();

  return (
<RegisterForm close={()=>navigate("/",{ replace: true })} />
  );
}

export default Registeretion;
