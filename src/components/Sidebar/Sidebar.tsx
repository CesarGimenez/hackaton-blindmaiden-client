import React from "react";

import { commonRoutes, doctorRoutes } from './commonRoutes';
import { useAuthStore } from "@/store";

const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout)
  const { user } = useAuthStore((state) => state);
  
  return (
    <div
        className={`min-h-screen p-5 bg-purple-800 text-white w-64 duration-300 relative hidden sm:block`}
      >
        <div className="mt-10 sticky top-0 left-0">
          <ul>
            {(user?.role === 'DOCTOR' ? doctorRoutes : commonRoutes).map((route) => (
              <li className="mb-4 pt-4" key={route.name}>
                <a
                  href={route.path}
                  className="block hover:bg-purple-700 p-2 rounded flex items-center justify-start gap-4" 
                >
                  <route.icon /> {route.name}
                </a>
              </li>
            ))}

            <li className="mb-4 pt-4" key="logout" onClick={logout}>
              <a href="login" className="block hover:bg-purple-700 p-2 rounded w-full border-2 border-white text-center rounded">
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;
