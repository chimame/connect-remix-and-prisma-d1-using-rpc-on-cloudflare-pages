import { type PlatformProxy } from "wrangler";
import type { UserService, CustomService } from "@rpc-sample/prisma/src";

interface Env {
  USER_SERVICE: CustomService<UserService>;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
