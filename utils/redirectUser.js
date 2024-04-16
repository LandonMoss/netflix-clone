// import { verifyToken } from "../lib/utils";

// const redirectUser = (ctx) => {
//   //access the token from cookie
//   const token = ctx.req?.cookies?.token;
//   const userId = verifyToken(token);

//   return {
//     userId,
//     token,
//   };
// };

// export default redirectUser;



import { jwtVerify } from "jose";

  const verifyToken = async(token) => {
    try {
      if (!token) {
        return null; //No token provided
      }
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.NEXT_PUBLIC_HASURA_JWT_SECRET)
      );
  
      const userId = verified.payload?.issuer;
      
      if (!userId) {
        return null; // Invalid token
      }
  
      return {
        userId,
        token,
      };
    } catch (error) {
      console.error("Error verifying token:", error.message);
      return null; // Error verifying token
    }
  };
  
  const redirectUser = async (ctx) => {
    const token = ctx.req?.cookies?.token;
    return await verifyToken(token);
  };
  
  const redirectUserReq = async (req) => {
    const token = req.cookies.token;
    return await verifyToken(token);
  };
  
  export { redirectUser, redirectUserReq };




// const redirectUser = async (ctx) => {
//   const token = ctx.req?.cookies?.token;

//   let userId;

//   try {
//     if (token) {
//       const verified = await jwtVerify(
//         token,
//         new TextEncoder().encode(process.env.NEXT_PUBLIC_HASURA_JWT_SECRET)
//       );

//       userId = verified.payload && verified.payload?.issuer;

//       return {
//         userId,
//         token,
//       };
//     }
//     return null;
//   } catch (err) {
//     console.error({ err });
//     return null;
//   }
// };

// export const redirectUserReq = async (req) => {
//   const token = req.cookies.token;
//   let userId;

//   try {
//     if (token) {
//       const verified = await jwtVerify(
//         token,
//         new TextEncoder().encode(process.env.NEXT_PUBLIC_HASURA_JWT_SECRET)
//       );

//       userId = verified.payload && verified.payload?.issuer;
//       return {
//         userId,
//         token,
//       };
//     } else {
//       return null;
//     }
//   } catch (err) {
//     console.error({ err });
//     return null;
//   }
// };

// export default redirectUser;



