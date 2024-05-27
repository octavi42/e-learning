import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
        name: z.string().min(3),
        email: z.string().email().or(z.literal('')).optional()
    }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.create({
            data: {
              name: input.name,
              email: input.email || null, // Ensure email is null if not provided
            }
          });
    
      return user.id
    }),


    findOrCreateUser: publicProcedure
    .input(z.object({ 
        name: z.string().min(3),
        email: z.string().email().or(z.literal('')).optional()
    }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.findFirst({
            where: { name: input.name },
            select: {
                id: true,
                name: true,
                categoryResume: true,
                answerResume: true
            }
        });

        console.log('user', user);
        

        if (user) return user

        return await ctx.db.user.create({
            data: {
                name: input.name,
                email: input.email || null, // Ensure email is null if not provided
            }
            });
    }),

    
  getUserByName: publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: { name: input.name },
    });
  }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.id },
      });
    }),
});
