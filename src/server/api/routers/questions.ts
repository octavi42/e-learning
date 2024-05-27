import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getCategorys: publicProcedure
  .query(({ ctx }) => {
    return ctx.db.category.findMany({
        orderBy: { order: 'asc' }
    });
  }),

  getQuestions: publicProcedure
  .input(z.object({ category: z.string() }))
    .query(({ ctx, input }) => {
    return ctx.db.question.findMany({
        where: { categoryName: input.category },
    });
  }),

  getFilteredQuestions: publicProcedure
    .input(z.object({ category: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const questions = await ctx.db.question.findMany({
        where: { 
          categoryName: input.category,
        },
      });

      const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
        const answer = await ctx.db.answer.findFirst({
          where: {
            questionId: question.id,
            userId: input.userId,
          },
        });
        return {
          ...question,
          answered: !!answer,
        };
      }));

      console.log('questionsWithAnswers', questionsWithAnswers);
      

      return questionsWithAnswers;
    }),

  getUnAnsweredQuestions: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
    return ctx.db.question.findMany({
        where: {
            NOT: {
                answers: {
                    some: {
                        userId: input.userId
                    }
                }
            }
        }
    });
    }),

  getQuestion: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ ctx, input }) => {
    return ctx.db.question.findMany({
        where: { categoryName: input.category },
    });
    }),
});
