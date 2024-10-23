"use client";
import Link from "next/link";

interface NavbarProps {
  user: {
    isAdmin: boolean;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  return (
    <header>
      <nav>
        <div>
          <Link href="/">{process.env.NEXT_PUBLIC_APP_NAME}</Link>
          <Link href="/me">Me</Link>
          {user && user.isAdmin && <Link href="/settings">Settings</Link>}
        </div>

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
