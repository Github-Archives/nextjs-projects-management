// !! Working, but had to change to "use client" for CreateUser

// ! Original Neon Docs Recommended
// import { neon } from "@neondatabase/serverless";

// async function getData() {
//   const sql = neon(process.env.DATABASE_URL);

//   const response = await sql`SELECT version()`;
//   console.log(response);
//   return response;
// }

// export default async function Page() {
//   const data = await getData();
// }

// ! Other Project (working)
import { neon } from "@neondatabase/serverless";

async function getData() {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  // sql`SELECT version()`; // Print version of the database
  try {
    const rowResponse = await sql`SELECT * FROM playing_with_neon LIMIT 1`; // Limit to 1 row
    return rowResponse[0]; // return the first row of db
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default getData; // Export the function directly
