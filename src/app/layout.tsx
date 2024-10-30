"use client";
import React, {
  useMemo,
  useEffect,
  useState,
  ReactNode,
  Suspense,
} from "react";
import { usePathname } from "next/navigation";
import { NotifyComponentsProvider } from "@/context/NotifyComponentsProvider";
import Loader from "@/components/loader/Loader";
import Alert from "@/components/alert/Alert";
import Dialog from "@/components/dialog/Dialog";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "@/styles/global.css";

interface LayoutProps {
  children: ReactNode;
}

interface User {
  isAdmin: boolean;
  roles: string[];
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (pathname !== "/login") {
      fetchUser();
    }
  }, []);

  const navbar = useMemo(() => {
    return pathname !== "/login" ? <Navbar user={user} /> : null;
  }, [pathname, user]);

  const footer = useMemo(() => {
    return pathname !== "/login" ? <Footer /> : null;
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <NotifyComponentsProvider>
          <Alert />
          <Dialog />
          {navbar}
          <main>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </main>
          {footer}
        </NotifyComponentsProvider>
      </body>
    </html>
  );
};

export default Layout;
