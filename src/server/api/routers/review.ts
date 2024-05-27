import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  createLink: publicProcedure
    .input(z.object({ 
        link: z.string(),
        summary: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.links.create({
        data: {
            link: input.link,
            summary: input.summary,
        },
      });
    }),

  referenceLink: publicProcedure
    .input(z.object({ 
        resourceId: z.string(),
        linkId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        return ctx.db.links.update({
            where: { id: input.linkId },
            data: {
                resourcesId: input.resourceId
            },
        });
    }),

  getLink: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ ctx, input }) => {
    return ctx.db.links.findUnique({
      where: { id: input.id },
    });
  }),

  createResource: publicProcedure
  .input(z.object({
    answerId: z.string()
  }))
  .query(({ctx, input}) => {
    return ctx.db.resources.create({ 
        data: { answerId: input.answerId }
    })
  })
});
