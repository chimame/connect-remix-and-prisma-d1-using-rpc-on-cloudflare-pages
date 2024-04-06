import { type PlatformProxy } from "wrangler";
import type { PrismaService } from "@rpc-sample/prisma/src";

interface Env {
	PRISMA_SERVICE: Service<PrismaService>;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
