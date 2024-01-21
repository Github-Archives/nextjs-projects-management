"use client";
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

  return (
    <div>
      <h2>First Row of Database:</h2>
      <p>{rowResponse.id}</p>
      <p>{rowResponse.name}</p>
      <p>{rowResponse.value}</p>
    </div>
  );
};

export default Member;
