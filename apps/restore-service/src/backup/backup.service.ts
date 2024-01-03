import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BackupServiceBase } from "./base/backup.service.base";

@Injectable()
export class BackupService extends BackupServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
