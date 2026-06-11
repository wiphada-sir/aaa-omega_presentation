import { useContext } from "react";

import { AdminAuthContext } from "./authAdminContext";

export const useAdminAuth = () => useContext(AdminAuthContext);