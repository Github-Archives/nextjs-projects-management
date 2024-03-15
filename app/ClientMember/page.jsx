// Gets first row from Neon database
"use client"; // Without this it's server rendered by default & cannot use Hooks
import React, { useEffect, useState } from "react";
import getData from "../utils/database";

const Member = () => {
  const [rowResponse, setRowResponse] = useState({});

  // Todo: I think there's a better way of handling fetching data from db that is NOT useEffect
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

  return (
    <div>
      <h2>First Row of Database:</h2>
      <p>{`id: ${rowResponse.id}`}</p>
      <p>{`Name: ${rowResponse.name}`}</p>
      <p>{`Value: ${rowResponse.value}`}</p>
    </div>
  );
};

export default Member;
