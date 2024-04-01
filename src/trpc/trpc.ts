// import { User } from '@/payload-types'
import { ExpressContext } from '@/server'

import { TRPCError, initTRPC } from '@trpc/server'
import { PayloadRequest } from 'payload/types'

const t = initTRPC.context<ExpressContext>().create()

export const router = t.router
export const publicProcedure = t.procedure