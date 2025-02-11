import { getPayloadClient } from '@/get-payload'
import { nextHandler } from '@/next-utils'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = await getPayloadClient()
  
  // Handle Payload CMS admin routes
  if (req.url?.includes('/sell')) {
    // @ts-ignore - o método handle existe mas não está na tipagem
    return payload.handle(req, res)
  }

  // Handle Next.js routes
  return nextHandler(req, res)
} 