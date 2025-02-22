'use client';

import { useEffect, useState } from "react";

export default function Index() {
  const [menu, setMenu] = useState([]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */

  const getMenu = async () => {
    try {
      const getMenu = await fetch("/api/menus");
      const res = await getMenu.json();
      setMenu(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("Hello there, 👋");
    getMenu();
  }, []);
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome frontend-app 👋
            </h1>
          </div>

          <div>
            <pre>{JSON.stringify(menu, null, 4)}</pre>
          </div>

          <p id="love">
            Carefully crafted with
            <svg
              fill="currentColor"
              stroke="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
