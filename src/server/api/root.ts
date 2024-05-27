import { postRouter } from "~/server/api/routers/post";
import { answerRouter } from "~/server/api/routers/answer";
import { reviewRouter } from "~/server/api/routers/review";
import { userRouter } from "~/server/api/routers/user";
import { questionRouter } from "~/server/api/routers/questions";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  answer: answerRouter,
  review: reviewRouter,
  user: userRouter,
  questions: questionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
