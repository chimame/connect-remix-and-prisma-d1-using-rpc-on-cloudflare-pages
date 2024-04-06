import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const users = await context.cloudflare.env.PRISMA_SERVICE.fetchUsers();

  return { users }
}
