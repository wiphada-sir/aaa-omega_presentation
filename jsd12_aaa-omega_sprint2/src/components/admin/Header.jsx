import { useContext } from "react";
import { Link } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import logoBrand from "../../assets/images/logo-aaa-omega.png";

export default function AdminHeader() {

  const { handleAdminNavMainToggle } = useContext(MessageContext);

  return (
    <header className="fixed z-98 flex md:hidden items-center w-full rounded-b-2xl bg-white shadow-2xl/10">
      <Link className="nav-logo px-5 py-3.5" to="/admin">
        <img className="w-32 rounded-none" src={logoBrand} />
      </Link>
      <button className="nav-toggle button button-icon button-ghost button-content hover:text-primary-hover hover:bg-neutral-lighter" onClick={handleAdminNavMainToggle}><span className="icon-material">menu</span></button>
    </header>
  );

};