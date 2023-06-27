import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { branchValidationSchema } from 'validationSchema/branches';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.branch
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBranchById();
    case 'PUT':
      return updateBranchById();
    case 'DELETE':
      return deleteBranchById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBranchById() {
    const data = await prisma.branch.findFirst(convertQueryToPrismaUtil(req.query, 'branch'));
    return res.status(200).json(data);
  }

  async function updateBranchById() {
    await branchValidationSchema.validate(req.body);
    const data = await prisma.branch.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBranchById() {
    const data = await prisma.branch.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
