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
  .input(z.object({ categoryId: z.string() }))
    .query(({ ctx, input }) => {
    return ctx.db.question.findMany({
        where: { categoryId: input.categoryId },
    });
  }),

  getIfQuestionsAnswered: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ ctx, input }) => {
    const allQuestions = await ctx.db.question.findMany();

    const answeredQuestions = await ctx.db.question.findMany({
      where: {
        answers: {
          some: {
            userId: input.userId,
          },
        },
      },
    });

    // Return true if the user has answered all questions, otherwise false
    return allQuestions.length === answeredQuestions.length;
  }),


  getUserQuestions: publicProcedure
    .input(z.object({ categoryId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const questions = await ctx.db.question.findMany({
        where: { categoryId: input.categoryId },
      });

      const questionsWithAnswers = await Promise.all(
        questions.map(async (question) => {
          const answer = await ctx.db.answer.findFirst({
            where: {
              questionId: question.id,
              userId: input.userId,
            },
          });

          return {
            ...question,
            answered: !!answer,
            answer: answer?.answer ?? null,
            review: answer?.review ?? null,
          };
        })
      );

      return questionsWithAnswers;
    }),


    getQuestionsOnCategory: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const categories = await ctx.db.category.findMany({
        orderBy: { order: 'asc' },
      });
  
      const questionsInCategory = [];
  
      for (const category of categories) {
        const questions = await ctx.db.question.findMany({
          where: { categoryId: category.id },
          include: {
            answers: {
              where: {
                userId: input.userId,
              },
            },
          },
        });
  
        questionsInCategory.push({
          category,
          questions,
        });
      }
  
      return questionsInCategory;
    }),


  getFilteredQuestions: publicProcedure
    .input(z.object({ category: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const questions = await ctx.db.question.findMany({
        where: { 
          categoryId: input.category,
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
        },
        orderBy: { order: 'asc' }
    });
    }),

  getFilteredQuestion: publicProcedure
    .input(z.object({ categoryId: z.string(), questionOrder: z.number(), userId: z.string() }))
    .query(async ({ ctx, input }) => {

      console.log('input', input);
      

      const question = await ctx.db.question.findFirst({
        where: {
          categoryId: input.categoryId,
          order: input.questionOrder,
        },
      });

      console.log('question', question);
      

      if (!question) {
        throw new Error('Question not found');
      }

      const answer = await ctx.db.answer.findFirst({
        where: {
          questionId: question.id,
          userId: input.userId,
        },
      });

      return {
        ...question,
        answered: !!answer,
        answer: answer?.answer ?? null,
      };
    }),
});
