// ! Original Code
const CreateUser = () => {
  return (
    <div>
      <h1>Only Admins!</h1>
    </div>
  );
};

export default CreateUser;

// ! Code inspired by original NextJS Project Management code
// ! Working, But....
// We are now making this a "use client"/client side component & no longer a server component.. which adds performance benefits & is the whole reason I went this path using /app routing server-side
// Server Components allow developers to better leverage server infrastructure. For example, large dependencies that previously would impact the JavaScript bundle size on the client can instead remain entirely on the server, leading to improved performance. They make writing a React application feel similar to PHP or Ruby on Rails, but with the power and flexibility of React for templating UI.

// Next.js uses Server Components, where the JSX gets compiled to "pure HTML" and sent to the browser.

// ! Remember the only reason we went with "use client" is because we wanted to take advantage of the { useEffect, useState } hooks. With server-side rendering we cannot use hooks!

// Wait!
// We are still getting this Warning Error:
// Warning: Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.

// ? You can read more here: https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp

// "use client";

// import React, { useEffect, useState } from "react";
// import getData from "../utils/database";

// const CreateUser = () => {
//   const [rowResponse, setRowResponse] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const getRowResponse = await getData();
//         setRowResponse(getRowResponse);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Only Admins!</h1>

//       <h2>First Row of Database:</h2>
//       <p>{rowResponse.id}</p>
//       <p>{rowResponse.name}</p>
//       <p>{rowResponse.value}</p>
//     </div>
//   );
// };
// export default CreateUser;
