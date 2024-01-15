// Gets first row from Neon database
"use client"; // Without this it's server rendered by default & cannot use Hooks

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import getData from "../utils/database";

const Member = () => {
  const [rowResponse, setRowResponse] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const getRowResponse = await getData();
        setRowResponse(getRowResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <h2>
        Demonstration of getting authentication to work on client-side (less
        preferable than server-side)
      </h2>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>

      <h2>First Row of Database:</h2>
      <p>{rowResponse.id}</p>
      <p>{rowResponse.name}</p>
      <p>{rowResponse.value}</p>
    </div>
  );
};

export default Member;
