import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  using users = await context.cloudflare.env.USER_SERVICE.fetchUsers();

  return { users }
}
