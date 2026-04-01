"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '20px', 
      borderBottom: '1px solid #ccc' 
    }}>
      <div style={{ fontWeight: 'bold' }}>
        <Link href="/">KTU TICKETS</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)}
          className="cursor-pointer">
            Log out
          </button>
        ) : (
          <Link href="/register">Register</Link>
        )}
      </div>
    </nav>
  );
}