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


    setReview: publicProcedure
    .input(z.object({ 
        userId: z.string(),
        category: z.string(),
        review: z.string(),
        improvement: z.string(),
        score: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.userCategoryReview.create({
            data: {
                userId: input.userId,
                categoryId: input.category,
                review: input.review,
                improvement: input.improvement,
                score: input.score
            }
        });

        return user
    }),

    getRevies: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.db.userCategoryReview.findMany({
            where: { userId: input.userId }
        });
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
