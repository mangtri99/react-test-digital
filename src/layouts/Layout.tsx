import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/composable/useAuth";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

function Layout() {
  const { user, logout } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <div className="flex justify-end pt-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="flex items-center space-x-2">
              <span>{user.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={logout}>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="py-8 px-0 md:py-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
