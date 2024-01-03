import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BackupService } from "./backup.service";
import { BackupControllerBase } from "./base/backup.controller.base";

@swagger.ApiTags("backups")
@common.Controller("backups")
export class BackupController extends BackupControllerBase {
  constructor(
    protected readonly service: BackupService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
