import { notFound } from "next/navigation";
import { z } from "zod";

export function assertParams<TSchema extends z.AnyZodObject>({
  schema,
  params,
  or = () => notFound(),
}: {
  schema: TSchema;
  params: unknown;
  or?: (error: z.ZodError) => never;
}): z.output<TSchema> {
  const result = schema.safeParse(params);
  if (result.success) {
    return result.data;
  }

  or(result.error);

  return undefined as never;
}
