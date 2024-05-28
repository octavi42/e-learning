import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const answerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ 
        answer: z.string(),
        questionId: z.string(),
        userId: z.string(),
        correct: z.boolean(),
        rating: z.number(),
        review: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.answer.create({
        data: {
            answer: input.answer,
            questionId: input.questionId,
            userId: input.userId,
            correct: input.correct,
            rating: input.rating,
            review: input.review,
        },
      });
    }),

  getAnswers: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.answer.findMany({
        where: { userId: input.userId },
      });
    }),

  getAnswer: publicProcedure
    .input(z.object({
      questionId: z.string(),
      userId: z.string(),
    }))
    .query(({ ctx, input }) => {
      return ctx.db.answer.findUnique({
        where: {
          questionId_userId: {
            questionId: input.questionId,
            userId: input.userId,
          },
        },
      });
    }),
});
