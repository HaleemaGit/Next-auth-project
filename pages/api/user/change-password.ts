// import { getSession } from 'next-auth/react';
// import { createUser, prisma, updateUser } from "../../../../utils/helpers";

// import { hashPassword, verifyPassword } from '../../../lib/auth';
// import { connectToDatabase } from '../../../lib/db';

// async function handler(req, res) {
//   if (req.method !== 'PATCH') {
//     return;
//   }

//   const session = await getSession({ req: req });

//   if (!session) {
//     res.status(401).json({ message: 'Not authenticated!' });
//     return;
//   }

//   const userEmail = session.user.email;
//   const oldPassword = req.body.oldPassword;
//   const newPassword = req.body.newPassword;

//   // const client = await connectToDatabase();

//   // const usersCollection = client.db().collection('users');

//   const user =await prisma.user.findFirst({
//     where: {
//       email: req.body.email,
//     },
//   });
// try {
//   const { email,password } = req.body;
//   console.log(password, "Hello password")
//   const user = updateUser(email,password)
//   res.status(200).json(user);
// } catch (e) {
//   // res.status(500).json({ message: 'Something went wrong'+e.message });
//   res.status(500).json({ message: 'Something went wrong'});
// }

//   const currentPassword = user.password;

//   const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

//   if (!passwordsAreEqual) {
//     res.status(403).json({ message: 'Invalid password.' });
//     client.close();
//     return;
//   }

//   const hashedPassword = await hashPassword(newPassword);

//   const result = await usersCollection.updateOne(
//     { email: userEmail },
//     { $set: { password: hashedPassword } }
//   );

//   client.close();
//   res.status(200).json({ message: 'Password updated!' });
// }

// export default handler;

// import { getSession } from 'next-auth/react';
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma, updateUser } from "../../../utils/helpers";
import { hashPassword, verifyPassword } from "../../../lib/auth/passwords";
import { getSession } from '@lib/auth/session';


export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return;
  }
  const session = await getSession({ req });
  // const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (session) {
    let isCurrentUser: User | null;
    if (req.method === 'PATCH') {
    isCurrentUser = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });
    try {
      const { email,password } = req.body;
      console.log(password, "Hello password")
      const user = updateUser(email,password)
      res.status(200).json(user);
    } catch (e) {
      // res.status(500).json({ message: 'Something went wrong'+e.message });
      res.status(500).json({ message: 'Something went wrong'});
    }
  }
  
  const currentPassword = isCurrentUser.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
}
}