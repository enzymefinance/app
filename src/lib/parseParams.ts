import { notFound } from "next/navigation";
import { z } from "zod";

export function parseParams<TSchema extends z.AnyZodObject>({
  schema,
  params,
}: { schema: TSchema; params: unknown }): z.output<TSchema> {
  const result = schema.safeParse(params);
  if (result.success) {
    return result.data;
  }

  notFound();
}
