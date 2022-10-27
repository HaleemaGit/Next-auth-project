import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "@lib/auth/passwords";

export const prisma = new PrismaClient();

// export const createUser = async (userData: any) => {
//   try {
//     await prisma.user.create({
//       data: {
//         email: userData.email,
//         password: await hashPassword(userData.password),
//         name: userData.name,
//       },
//       select: {
//         email: true,
//         name: true,
//         password:true,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const authenticateUser = async (email: string, password: string) => {
//   try {
//     let user = await prisma.user.findFirst({
//       where: {
//         email,
//       },
//       select: {
//         email: true,
//         password: true,
//         name: true,
//       },
//     });
//     if (!user) {
//       throw new Error("No account with this email exists");
//     } else {
//       const validPassword = await verifyPassword(password, user?.password);
//       if (!validPassword) {
//         throw new Error("Username and Passwords do not match");
//       }
//       const authenticatedUser = {
//         email: user?.email,
//         name: user?.name,
//       };
//       return authenticatedUser;
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const updateUser = async (email: string,password: string) => {
//   try {
//     let user = await prisma.user.findFirst({
//       where: {
//         email,
//       },
//       select: {
//         email: true,
//       },
//     });
//     if (!user) {
//       throw new Error("No account with this email exists");
//     } else {
//       try {
//         let user= await prisma.user.update({
//           where: {
//             email,
//           },
//           data: {
//             password: await hashPassword(password),
//           },
//         })
//         return user;
//       } catch (error) {
//         console.log(error);
//         throw error;
//       }
//     }}
//     catch (error) {
//       console.log(error);
//       throw error;
//     }
// };





  export const updateUser = async (email: string,password: string) => {
    try {
      let user= await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: await hashPassword(password),
        },
      })
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };