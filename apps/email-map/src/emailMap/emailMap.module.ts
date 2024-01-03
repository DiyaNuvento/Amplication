import { Module } from "@nestjs/common";
import { EmailMapModuleBase } from "./base/emailMap.module.base";
import { EmailMapService } from "./emailMap.service";
import { EmailMapController } from "./emailMap.controller";
import { EmailMapResolver } from "./emailMap.resolver";

@Module({
  imports: [EmailMapModuleBase],
  controllers: [EmailMapController],
  providers: [EmailMapService, EmailMapResolver],
  exports: [EmailMapService],
})
export class EmailMapModule {}
