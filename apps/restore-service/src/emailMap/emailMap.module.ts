import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { EmailMapModuleBase } from "./base/emailMap.module.base";
import { EmailMapService } from "./emailMap.service";
import { EmailMapController } from "./emailMap.controller";
import { EmailMapResolver } from "./emailMap.resolver";

@Module({
  imports: [EmailMapModuleBase, forwardRef(() => AuthModule)],
  controllers: [EmailMapController],
  providers: [EmailMapService, EmailMapResolver],
  exports: [EmailMapService],
})
export class EmailMapModule {}
