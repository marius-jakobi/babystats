import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import getConfig from "next/config";

type SigninErrorResponse = {
  msg: string,
}

type SigninSuccessResponse = {
  token: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SigninErrorResponse | SigninSuccessResponse>
) {
  const { serverRuntimeConfig } = getConfig();

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) {
      return res.status(403).json({ msg: "Die Zugangsdaten sind ungültig." });
    }

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      const payload = {
        sub: user.id,
        username: user.username,
      };

      const secret = serverRuntimeConfig.AUTH_SECRET;

      return res.status(200).json({ token: sign(payload, secret) });
    }

    return res.status(403).json({ msg: "Die Zugangsdaten sind ungültig." });

  } catch (e) {
    return res.status(500).json({ msg: "Interner Server-Fehler" });
  }
}