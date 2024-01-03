import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EmailMapServiceBase } from "./base/emailMap.service.base";

@Injectable()
export class EmailMapService extends EmailMapServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
