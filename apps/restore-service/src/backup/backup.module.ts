import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { BackupModuleBase } from "./base/backup.module.base";
import { BackupService } from "./backup.service";
import { BackupController } from "./backup.controller";
import { BackupResolver } from "./backup.resolver";

@Module({
  imports: [BackupModuleBase, forwardRef(() => AuthModule)],
  controllers: [BackupController],
  providers: [BackupService, BackupResolver],
  exports: [BackupService],
})
export class BackupModule {}
