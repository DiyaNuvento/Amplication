/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { Backup } from "./Backup";
import { BackupCountArgs } from "./BackupCountArgs";
import { BackupFindManyArgs } from "./BackupFindManyArgs";
import { BackupFindUniqueArgs } from "./BackupFindUniqueArgs";
import { CreateBackupArgs } from "./CreateBackupArgs";
import { UpdateBackupArgs } from "./UpdateBackupArgs";
import { DeleteBackupArgs } from "./DeleteBackupArgs";
import { RestoreFindManyArgs } from "../../restore/base/RestoreFindManyArgs";
import { Restore } from "../../restore/base/Restore";
import { BackupService } from "../backup.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Backup)
export class BackupResolverBase {
  constructor(
    protected readonly service: BackupService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Backup",
    action: "read",
    possession: "any",
  })
  async _backupsMeta(
    @graphql.Args() args: BackupCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Backup])
  @nestAccessControl.UseRoles({
    resource: "Backup",
    action: "read",
    possession: "any",
  })
  async backups(@graphql.Args() args: BackupFindManyArgs): Promise<Backup[]> {
    return this.service.backups(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Backup, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Backup",
    action: "read",
    possession: "own",
  })
  async backup(
    @graphql.Args() args: BackupFindUniqueArgs
  ): Promise<Backup | null> {
    const result = await this.service.backup(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Backup)
  @nestAccessControl.UseRoles({
    resource: "Backup",
    action: "create",
    possession: "any",
  })
  async createBackup(@graphql.Args() args: CreateBackupArgs): Promise<Backup> {
    return await this.service.createBackup({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Backup)
  @nestAccessControl.UseRoles({
    resource: "Backup",
    action: "update",
    possession: "any",
  })
  async updateBackup(
    @graphql.Args() args: UpdateBackupArgs
  ): Promise<Backup | null> {
    try {
      return await this.service.updateBackup({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Backup)
  @nestAccessControl.UseRoles({
    resource: "Backup",
    action: "delete",
    possession: "any",
  })
  async deleteBackup(
    @graphql.Args() args: DeleteBackupArgs
  ): Promise<Backup | null> {
    try {
      return await this.service.deleteBackup(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.ResolveField(() => [Restore], { name: "restores" })
  @nestAccessControl.UseRoles({
    resource: "Restore",
    action: "read",
    possession: "any",
  })
  async findRestores(
    @graphql.Parent() parent: Backup,
    @graphql.Args() args: RestoreFindManyArgs
  ): Promise<Restore[]> {
    const results = await this.service.findRestores(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }
}