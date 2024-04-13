import React from "react";
import prisma from "@/prisma/prismaEntrypoint";

// Function to fetch and display entries from the database
// async function displayEntries() {
export async function displayEntries() {
  try {
    // Use Prisma Client methods to query the database
    const entries = await prisma.entry.findMany(); // Assuming "entry" is the name of your database table/model

    // Handle the retrieved data
    console.log("Entries from the database:");
    entries.forEach((entry) => {
      console.log(entry); // Adjust this according to your data structure
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
  } finally {
    // Don't forget to close the Prisma Client connection when done
    await prisma.$disconnect();
  }
}

// Call the function to display entries
displayEntries();

function DatabaseDisplay() {
  return <div>DatabaseDisplay</div>;
}

export default DatabaseDisplay;
