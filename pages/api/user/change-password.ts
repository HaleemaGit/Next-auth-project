

// import { getSession } from 'next-auth/react';
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma, updateUser } from "../../../utils/helpers";
import { hashPassword, verifyPassword } from "../../../lib/auth/passwords";
import { getSession } from '@lib/auth/session';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return;
  }
  const session = await getSession({ req });
  console.log("present-session", session)

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
          email: userEmail,
        },
      });

      const currentPassword = isCurrentUser.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

      try {
        let user= await prisma.user.update({
          where: {
            email:userEmail,
          },
          data: {
            password: hashedPassword,
          },
        })
        res.status(200).json({ message: 'Password Changed!' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong'});
      }
    }  
  }
}

