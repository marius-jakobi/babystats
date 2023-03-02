import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { hash } from "bcrypt";

type SignupResponse = {
  msg: string,
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<SignupResponse>
) {
  const { email, username, password } = req.body;
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: await hash(password, 10),
      }
    });
  
    console.log(`User created: ${user.username} (${user.id})`)
  
    return res.status(201).json({ msg: "Der Account wurde erstellt." });
  } catch (e) {
    const err = e as PrismaClientKnownRequestError;
    
    if (err.code === "P2002") {
      // Unique constraint error
      if (err.meta?.target) {
        const target = err.meta.target as Array<string>;

        if (target.includes("email")) {
          return res.status(400).json({ msg: `Die E-Mail-Adresse "${email}" existiert bereits.`});
        } else if (target.includes("username")) {
          return res.status(400).json({ msg: `Der Benutzername "${username}" existiert bereits.`});
        }
      }
    } else {
      return res.status(500).json({msg: `Interner Server-Fehler`});
    }
  }
}