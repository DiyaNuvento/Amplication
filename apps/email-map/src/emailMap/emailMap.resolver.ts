import * as graphql from "@nestjs/graphql";
import { EmailMapResolverBase } from "./base/emailMap.resolver.base";
import { EmailMap } from "./base/EmailMap";
import { EmailMapService } from "./emailMap.service";

@graphql.Resolver(() => EmailMap)
export class EmailMapResolver extends EmailMapResolverBase {
  constructor(protected readonly service: EmailMapService) {
    super(service);
  }
}
