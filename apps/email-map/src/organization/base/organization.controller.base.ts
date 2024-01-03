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
import { OrganizationService } from "../organization.service";
import { OrganizationCreateInput } from "./OrganizationCreateInput";
import { Organization } from "./Organization";
import { OrganizationFindManyArgs } from "./OrganizationFindManyArgs";
import { OrganizationWhereUniqueInput } from "./OrganizationWhereUniqueInput";
import { OrganizationUpdateInput } from "./OrganizationUpdateInput";
import { EmailMapFindManyArgs } from "../../emailMap/base/EmailMapFindManyArgs";
import { EmailMap } from "../../emailMap/base/EmailMap";
import { EmailMapWhereUniqueInput } from "../../emailMap/base/EmailMapWhereUniqueInput";

export class OrganizationControllerBase {
  constructor(protected readonly service: OrganizationService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Organization })
  async createOrganization(
    @common.Body() data: OrganizationCreateInput
  ): Promise<Organization> {
    return await this.service.createOrganization({
      data: data,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [Organization] })
  @ApiNestedQuery(OrganizationFindManyArgs)
  async organizations(@common.Req() request: Request): Promise<Organization[]> {
    const args = plainToClass(OrganizationFindManyArgs, request.query);
    return this.service.organizations({
      ...args,
      select: {
        createdAt: true,
        id: true,
        updatedAt: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Organization })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async organization(
    @common.Param() params: OrganizationWhereUniqueInput
  ): Promise<Organization | null> {
    const result = await this.service.organization({
      where: params,
      select: {
        createdAt: true,
        id: true,
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

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Organization })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateOrganization(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() data: OrganizationUpdateInput
  ): Promise<Organization | null> {
    try {
      return await this.service.updateOrganization({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
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
  @swagger.ApiOkResponse({ type: Organization })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteOrganization(
    @common.Param() params: OrganizationWhereUniqueInput
  ): Promise<Organization | null> {
    try {
      return await this.service.deleteOrganization({
        where: params,
        select: {
          createdAt: true,
          id: true,
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

  @common.Get("/:id/emailMaps")
  @ApiNestedQuery(EmailMapFindManyArgs)
  async findEmailMaps(
    @common.Req() request: Request,
    @common.Param() params: OrganizationWhereUniqueInput
  ): Promise<EmailMap[]> {
    const query = plainToClass(EmailMapFindManyArgs, request.query);
    const results = await this.service.findEmailMaps(params.id, {
      ...query,
      select: {
        box: true,
        createdAt: true,
        gDrive: true,
        id: true,
        oneDrive: true,

        organization: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
    if (results === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return results;
  }

  @common.Post("/:id/emailMaps")
  async connectEmailMaps(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() body: EmailMapWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      emailMaps: {
        connect: body,
      },
    };
    await this.service.updateOrganization({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/emailMaps")
  async updateEmailMaps(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() body: EmailMapWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      emailMaps: {
        set: body,
      },
    };
    await this.service.updateOrganization({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/emailMaps")
  async disconnectEmailMaps(
    @common.Param() params: OrganizationWhereUniqueInput,
    @common.Body() body: EmailMapWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      emailMaps: {
        disconnect: body,
      },
    };
    await this.service.updateOrganization({
      where: params,
      data,
      select: { id: true },
    });
  }
}