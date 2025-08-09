import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: { title, content },
    });
    return res.status(201).json(post);
  }

  res.status(405).end();
}
// This file handles API requests for posts, allowing retrieval and creation of posts using Prisma.