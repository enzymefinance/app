import type { FunctionComponent } from "react";

// rome-ignore lint/nursery/noBannedTypes: <explanation>
type AsyncComponent<TProps = {}> = (
  ...args: Parameters<FunctionComponent<TProps>>
) => Promise<ReturnType<FunctionComponent<TProps>>>;

// NOTE: This is a helper type to get async components (suspense) to play nice with typescript.
// Once https://github.com/vercel/next.js/issues/42292 is resolved, we should remove this again.
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function asSyncComponent<TComponent extends AsyncComponent<any>>(
  component: TComponent,
): FunctionComponent<TComponent extends AsyncComponent<infer P> ? P : never> {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  return component as any;
}
