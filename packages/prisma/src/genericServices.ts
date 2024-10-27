/*
 * This file is generated. Do not modify it manually.
 */

import { WorkerEntrypoint } from "cloudflare:workers";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
interface IGenericService<T extends Prisma.ModelName> {
  findUnique: PrismaClient[Uncapitalize<T>]["findUnique"];
  findUniqueOrThrow: PrismaClient[Uncapitalize<T>]["findUniqueOrThrow"];
  findFirst: PrismaClient[Uncapitalize<T>]["findFirst"];
  findFirstOrThrow: PrismaClient[Uncapitalize<T>]["findFirstOrThrow"];
  findMany: PrismaClient[Uncapitalize<T>]["findMany"];
  create: PrismaClient[Uncapitalize<T>]["create"];
  update: PrismaClient[Uncapitalize<T>]["update"];
  upsert: PrismaClient[Uncapitalize<T>]["upsert"];
  delete: PrismaClient[Uncapitalize<T>]["delete"];
  createMany: PrismaClient[Uncapitalize<T>]["createMany"];
  createManyAndReturn: PrismaClient[Uncapitalize<T>]["createManyAndReturn"];
  updateMany: PrismaClient[Uncapitalize<T>]["updateMany"];
  deleteMany: PrismaClient[Uncapitalize<T>]["deleteMany"];
  count: PrismaClient[Uncapitalize<T>]["count"];
  aggregate: PrismaClient[Uncapitalize<T>]["aggregate"];
  groupBy: PrismaClient[Uncapitalize<T>]["groupBy"];
}
class BaseService extends WorkerEntrypoint<Env> {
  protected db: PrismaClient;
  constructor(...args: ConstructorParameters<typeof WorkerEntrypoint<Env>>) {
    super(...args);
    const adapter = new PrismaD1(this.env.DB);
    this.db = new PrismaClient({ adapter });
  }
}
export class UserGenericService
  extends BaseService
  implements IGenericService<"User">
{
  get findUnique() {
    return this.db.user.findUnique;
  }
  get findUniqueOrThrow() {
    return this.db.user.findUniqueOrThrow;
  }
  get findFirst() {
    return this.db.user.findFirst;
  }
  get findFirstOrThrow() {
    return this.db.user.findFirstOrThrow;
  }
  get findMany() {
    return this.db.user.findMany;
  }
  get create() {
    return this.db.user.create;
  }
  get update() {
    return this.db.user.update;
  }
  get upsert() {
    return this.db.user.upsert;
  }
  get delete() {
    return this.db.user.delete;
  }
  get createMany() {
    return this.db.user.createMany;
  }
  get createManyAndReturn() {
    return this.db.user.createManyAndReturn;
  }
  get updateMany() {
    return this.db.user.updateMany;
  }
  get deleteMany() {
    return this.db.user.deleteMany;
  }
  get count() {
    return this.db.user.count;
  }
  get aggregate() {
    return this.db.user.aggregate;
  }
  get groupBy() {
    return this.db.user.groupBy;
  }
}
