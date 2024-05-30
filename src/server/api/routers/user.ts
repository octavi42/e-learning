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


    changeUserEvaluation: publicProcedure
    .input(z.object({ userId: z.string(), evaluation: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.update({
            where: { id: input.userId },
            data: {
              evaluation: input.evaluation
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
        source: z.string().optional(),
        links: z.array(z.object({title: z.string().optional(), url: z.string(), summary: z.string() })).optional()
    }))
    .mutation(async ({ ctx, input }) => {
        try {

            // Start a transaction
            const result = await ctx.db.$transaction(async (prisma) => {
                const userCategoryReview = await prisma.userCategoryReview.create({
                    data: {
                        userId: input.userId,
                        categoryId: input.category,
                        review: input.review,
                        improvement: input.improvement,
                        source: input.source || null,
                        score: input.score,
                    }
                });

                if (input.links && input.links.length > 0) {
                    await prisma.links.createMany({
                        data: input.links.map(link => ({
                            title: link.title,
                            link: link.url,
                            summary: link.summary,
                            userCategoryReviewId: userCategoryReview.id
                        }))
                    });
                }

                return userCategoryReview;
            });

            return result;
        } catch (error) {
            console.error('Error creating review:', error);
            throw new Error('Failed to create review and links');
        }
    }),


    getRevies: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
        return ctx.db.userCategoryReview.findMany({
            where: { userId: input.userId },
            include: {
                links: true,
                category: true
            }
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
