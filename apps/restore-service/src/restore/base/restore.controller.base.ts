/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { RestoreService } from "../restore.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { RestoreCreateInput } from "./RestoreCreateInput";
import { Restore } from "./Restore";
import { RestoreFindManyArgs } from "./RestoreFindManyArgs";
import { RestoreWhereUniqueInput } from "./RestoreWhereUniqueInput";
import { RestoreUpdateInput } from "./RestoreUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class RestoreControllerBase {
  constructor(
    protected readonly service: RestoreService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Restore })
  @nestAccessControl.UseRoles({
    resource: "Restore",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createRestore(
    @common.Body() data: RestoreCreateInput
  ): Promise<Restore> {
    return await this.service.createRestore({
      data: {
        ...data,

        backup: data.backup
          ? {
              connect: data.backup,
            }
          : undefined,

        createdBy: {
          connect: data.createdBy,
        },
      },
      select: {
        backup: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        createdBy: {
          select: {
            id: true,
          },
        },

        details: true,
        id: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Restore] })
  @ApiNestedQuery(RestoreFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Restore",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async restores(@common.Req() request: Request): Promise<Restore[]> {
    const args = plainToClass(RestoreFindManyArgs, request.query);
    return this.service.restores({
      ...args,
      select: {
        backup: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        createdBy: {
          select: {
            id: true,
          },
        },

        details: true,
        id: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Restore })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Restore",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async restore(
    @common.Param() params: RestoreWhereUniqueInput
  ): Promise<Restore | null> {
    const result = await this.service.restore({
      where: params,
      select: {
        backup: {
          select: {
            id: true,
          },
        },

        createdAt: true,

        createdBy: {
          select: {
            id: true,
          },
        },

        details: true,
        id: true,
        status: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Restore })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Restore",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateRestore(
    @common.Param() params: RestoreWhereUniqueInput,
    @common.Body() data: RestoreUpdateInput
  ): Promise<Restore | null> {
    try {
      return await this.service.updateRestore({
        where: params,
        data: {
          ...data,

          backup: data.backup
            ? {
                connect: data.backup,
              }
            : undefined,

          createdBy: {
            connect: data.createdBy,
          },
        },
        select: {
          backup: {
            select: {
              id: true,
            },
          },

          createdAt: true,

          createdBy: {
            select: {
              id: true,
            },
          },

          details: true,
          id: true,
          status: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Restore })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Restore",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteRestore(
    @common.Param() params: RestoreWhereUniqueInput
  ): Promise<Restore | null> {
    try {
      return await this.service.deleteRestore({
        where: params,
        select: {
          backup: {
            select: {
              id: true,
            },
          },

          createdAt: true,

          createdBy: {
            select: {
              id: true,
            },
          },

          details: true,
          id: true,
          status: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
