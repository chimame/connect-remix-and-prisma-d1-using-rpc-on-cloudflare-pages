import { WorkerEntrypoint } from "cloudflare:workers";
import { UserGenericService } from "./genericServices";

type PrismaMethods = {
  findUnique: unknown;
  findUniqueOrThrow: unknown;
  findFirst: unknown;
  findFirstOrThrow: unknown;
  findMany: unknown;
  create: unknown;
  update: unknown;
  upsert: unknown;
  delete: unknown;
  createMany: unknown;
  createManyAndReturn: unknown;
  updateMany: unknown;
  deleteMany: unknown;
  count: unknown;
  aggregate: unknown;
  groupBy: unknown;
};

export type CustomService<T extends WorkerEntrypoint & PrismaMethods> = Service<
  Omit<T, keyof PrismaMethods>
> &
  Pick<T, keyof PrismaMethods>;

export class UserService extends UserGenericService {
  fetchUsers() {
    return this.db.user.findMany();
  }

  async createUser(data: { name: string; email: string }) {
    const user = await this.db.user.create({
      data,
    });

    return user;
  }
}

export default {
  // An error occurs when deploying this worker without register event handlers as default export.
  async fetch() {
    return new Response("Healthy!");
  },
};
