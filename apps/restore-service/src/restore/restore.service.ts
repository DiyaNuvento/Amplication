import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RestoreServiceBase } from "./base/restore.service.base";

@Injectable()
export class RestoreService extends RestoreServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
