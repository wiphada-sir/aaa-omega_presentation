import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { useAdminAuth } from "../../contexts/authAdminContext/useAdminAuth";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { DataNotFound } from "../../components/common/NotFound";
import logoBrand from "../../assets/images/logo-aaa-omega.png";

export default function AdminSidebar() {

  const { user, logout } = useAdminAuth();
  const { adminNavMainActive, handleAdminNavMainToggle, handleAdminNavSidebarClose } = useContext(MessageContext);
  const navigate = useNavigate();

  const navSidebarClass = ({ isActive }) => `button button-soft justify-start w-full ${isActive ? "text-primary-hover bg-primary-light/60 hover:bg-primary-light/80" : "button-content hover:bg-white"}`;

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/auth/login", { replace: true });
    };
  };

  return (
    <aside id="asideContainer" className={`fixed z-99 max-md:shadow-2xl/10 ${!adminNavMainActive && "-translate-x-full"} md:translate-x-0 transition-all duration-300`}>
      <nav id="navContainer" className="flex flex-col w-50 h-dvh overflow-auto rounded-r-2xl bg-neutral-lighter">
        <ul id="navHeader" className="flex justify-between items-center gap-2 p-2">
          <li><NavLink className="nav-logo block px-3 py-1.5" to="/admin" onClick={handleAdminNavSidebarClose}>
            <img className="w-32 rounded-none" src={logoBrand} /></NavLink></li>
          <li className="md:hidden"><button className="nav-toggle button button-icon button-ghost button-content" onClick={handleAdminNavMainToggle}><span className="icon-material">left_panel_close</span></button></li>
        </ul>
        <ul id="navMain" className="flex flex-col flex-1 gap-2 p-2 border-t">
          <li><NavLink className={navSidebarClass} end to="/admin" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>home</span> แดชบอร์ด</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/products" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>storefront</span> สินค้า</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/orders" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>shopping_cart</span> คำสั่งซื้อ</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/services" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>build</span> บริการซ่อมบำรุง</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/users" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>person_outline</span> รายชื่อบัญชี</>)}
          </NavLink></li>
        </ul>
        <ul id="navFooter" className="flex flex-col gap-2 p-2 border-t">
          <li><NavLink className="group button button-ghost button-content justify-start items-start w-full hover:text-white py-2 border hover:border-primary-soft bg-white hover:bg-primary-soft" to="#soon"><span className="icon-material">account_circle</span>
            <div className="flex flex-col overflow-hidden">
              <span className="overflow-hidden whitespace-nowrap text-ellipsis leading-6">{`${user?.firstName} ${user?.lastName}`.trim() || <DataNotFound />}</span>
              <span className="overflow-hidden whitespace-nowrap text-ellipsis text-xs capitalize text-content-soft group-hover:text-content-light transition-all">{user?.role || ""}</span>
            </div>
          </NavLink></li>
          <li><button className="button button-ghost button-content justify-start w-full hover:text-error-hover" onClick={handleLogout}><span className="icon-material">logout</span> ออกจากระบบ</button></li>
        </ul>
      </nav>
    </aside>
  );

};