import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { atmValidationSchema } from 'validationSchema/atms';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.atm
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAtmById();
    case 'PUT':
      return updateAtmById();
    case 'DELETE':
      return deleteAtmById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAtmById() {
    const data = await prisma.atm.findFirst(convertQueryToPrismaUtil(req.query, 'atm'));
    return res.status(200).json(data);
  }

  async function updateAtmById() {
    await atmValidationSchema.validate(req.body);
    const data = await prisma.atm.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAtmById() {
    const data = await prisma.atm.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
