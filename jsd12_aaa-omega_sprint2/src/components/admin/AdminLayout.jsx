import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout() {

  return (
    <div className="dashboard flex">
      <Header />
      <Sidebar />
      <main className="flex flex-col grow min-w-0 w-2/3 min-h-dvh gap-10 px-5 pt-25 pb-10 md:px-10 md:py-15 md:ml-50">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );

};