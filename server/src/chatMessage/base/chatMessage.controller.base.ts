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
import { ChatMessageService } from "../chatMessage.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ChatMessageCreateInput } from "./ChatMessageCreateInput";
import { ChatMessage } from "./ChatMessage";
import { ChatMessageFindManyArgs } from "./ChatMessageFindManyArgs";
import { ChatMessageWhereUniqueInput } from "./ChatMessageWhereUniqueInput";
import { ChatMessageUpdateInput } from "./ChatMessageUpdateInput";
import { FileFindManyArgs } from "../../file/base/FileFindManyArgs";
import { File } from "../../file/base/File";
import { FileWhereUniqueInput } from "../../file/base/FileWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ChatMessageControllerBase {
  constructor(
    protected readonly service: ChatMessageService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ChatMessage })
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createChatMessage(
    @common.Body() data: ChatMessageCreateInput
  ): Promise<ChatMessage> {
    return await this.service.createChatMessage({
      data: {
        ...data,

        thread: data.thread
          ? {
              connect: data.thread,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        isRead: true,
        text: true,

        thread: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [ChatMessage] })
  @ApiNestedQuery(ChatMessageFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async chatMessages(@common.Req() request: Request): Promise<ChatMessage[]> {
    const args = plainToClass(ChatMessageFindManyArgs, request.query);
    return this.service.chatMessages({
      ...args,
      select: {
        createdAt: true,
        id: true,
        isRead: true,
        text: true,

        thread: {
          select: {
            id: true,
          },
        },

        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: ChatMessage })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async chatMessage(
    @common.Param() params: ChatMessageWhereUniqueInput
  ): Promise<ChatMessage | null> {
    const result = await this.service.chatMessage({
      where: params,
      select: {
        createdAt: true,
        id: true,
        isRead: true,
        text: true,

        thread: {
          select: {
            id: true,
          },
        },

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
  @swagger.ApiOkResponse({ type: ChatMessage })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateChatMessage(
    @common.Param() params: ChatMessageWhereUniqueInput,
    @common.Body() data: ChatMessageUpdateInput
  ): Promise<ChatMessage | null> {
    try {
      return await this.service.updateChatMessage({
        where: params,
        data: {
          ...data,

          thread: data.thread
            ? {
                connect: data.thread,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          id: true,
          isRead: true,
          text: true,

          thread: {
            select: {
              id: true,
            },
          },

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
  @swagger.ApiOkResponse({ type: ChatMessage })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteChatMessage(
    @common.Param() params: ChatMessageWhereUniqueInput
  ): Promise<ChatMessage | null> {
    try {
      return await this.service.deleteChatMessage({
        where: params,
        select: {
          createdAt: true,
          id: true,
          isRead: true,
          text: true,

          thread: {
            select: {
              id: true,
            },
          },

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

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id/files")
  @ApiNestedQuery(FileFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async findFiles(
    @common.Req() request: Request,
    @common.Param() params: ChatMessageWhereUniqueInput
  ): Promise<File[]> {
    const query = plainToClass(FileFindManyArgs, request.query);
    const results = await this.service.findFiles(params.id, {
      ...query,
      select: {
        chatMessage: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
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

  @common.Post("/:id/files")
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "update",
    possession: "any",
  })
  async connectFiles(
    @common.Param() params: ChatMessageWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      files: {
        connect: body,
      },
    };
    await this.service.updateChatMessage({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/files")
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "update",
    possession: "any",
  })
  async updateFiles(
    @common.Param() params: ChatMessageWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      files: {
        set: body,
      },
    };
    await this.service.updateChatMessage({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/files")
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "update",
    possession: "any",
  })
  async disconnectFiles(
    @common.Param() params: ChatMessageWhereUniqueInput,
    @common.Body() body: FileWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      files: {
        disconnect: body,
      },
    };
    await this.service.updateChatMessage({
      where: params,
      data,
      select: { id: true },
    });
  }
}
