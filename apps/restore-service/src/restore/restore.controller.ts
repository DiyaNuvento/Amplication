import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RestoreService } from "./restore.service";
import { RestoreControllerBase } from "./base/restore.controller.base";

@swagger.ApiTags("restores")
@common.Controller("restores")
export class RestoreController extends RestoreControllerBase {
  constructor(
    protected readonly service: RestoreService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
