import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RestoreModuleBase } from "./base/restore.module.base";
import { RestoreService } from "./restore.service";
import { RestoreController } from "./restore.controller";
import { RestoreResolver } from "./restore.resolver";

@Module({
  imports: [RestoreModuleBase, forwardRef(() => AuthModule)],
  controllers: [RestoreController],
  providers: [RestoreService, RestoreResolver],
  exports: [RestoreService],
})
export class RestoreModule {}
