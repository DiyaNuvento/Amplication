import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EmailMapService } from "./emailMap.service";
import { EmailMapControllerBase } from "./base/emailMap.controller.base";

@swagger.ApiTags("emailMaps")
@common.Controller("emailMaps")
export class EmailMapController extends EmailMapControllerBase {
  constructor(
    protected readonly service: EmailMapService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
