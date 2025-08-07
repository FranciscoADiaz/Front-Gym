import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok } from "react-icons/fa6";
import "./RedesC.css";

const Redes = () => {
  return (
    <div className="container-redes">
      <a href="https://www.instagram.com/">
        <FaInstagram className="icon" />
      </a>
      <a href="https://www.tiktok.com/es/">
        <FaTiktok className="icon" />
      </a>

      <a href="https://www.facebook.com/?locale=es_LA">
        <FaFacebook className="icon" />
      </a>
      <a href="https://x.com/?lang=es">
        <FaXTwitter className="icon" />
      </a>
    </div>
  );
};

export default Redes;