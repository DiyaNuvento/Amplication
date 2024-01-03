import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { EmailMapResolverBase } from "./base/emailMap.resolver.base";
import { EmailMap } from "./base/EmailMap";
import { EmailMapService } from "./emailMap.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => EmailMap)
export class EmailMapResolver extends EmailMapResolverBase {
  constructor(
    protected readonly service: EmailMapService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
