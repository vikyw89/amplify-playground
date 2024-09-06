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
import { ThreadService } from "../thread.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { ThreadCreateInput } from "./ThreadCreateInput";
import { Thread } from "./Thread";
import { ThreadFindManyArgs } from "./ThreadFindManyArgs";
import { ThreadWhereUniqueInput } from "./ThreadWhereUniqueInput";
import { ThreadUpdateInput } from "./ThreadUpdateInput";
import { ChatMessageFindManyArgs } from "../../chatMessage/base/ChatMessageFindManyArgs";
import { ChatMessage } from "../../chatMessage/base/ChatMessage";
import { ChatMessageWhereUniqueInput } from "../../chatMessage/base/ChatMessageWhereUniqueInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class ThreadControllerBase {
  constructor(
    protected readonly service: ThreadService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Thread })
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiBody({
    type: ThreadCreateInput,
  })
  async createThread(@common.Body() data: ThreadCreateInput): Promise<Thread> {
    return await this.service.createThread({
      data: data,
      select: {
        createdAt: true,
        id: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Thread] })
  @ApiNestedQuery(ThreadFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async threads(@common.Req() request: Request): Promise<Thread[]> {
    const args = plainToClass(ThreadFindManyArgs, request.query);
    return this.service.threads({
      ...args,
      select: {
        createdAt: true,
        id: true,
        title: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Thread })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async thread(
    @common.Param() params: ThreadWhereUniqueInput
  ): Promise<Thread | null> {
    const result = await this.service.thread({
      where: params,
      select: {
        createdAt: true,
        id: true,
        title: true,
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
  @swagger.ApiOkResponse({ type: Thread })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiBody({
    type: ThreadUpdateInput,
  })
  async updateThread(
    @common.Param() params: ThreadWhereUniqueInput,
    @common.Body() data: ThreadUpdateInput
  ): Promise<Thread | null> {
    try {
      return await this.service.updateThread({
        where: params,
        data: data,
        select: {
          createdAt: true,
          id: true,
          title: true,
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
  @swagger.ApiOkResponse({ type: Thread })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteThread(
    @common.Param() params: ThreadWhereUniqueInput
  ): Promise<Thread | null> {
    try {
      return await this.service.deleteThread({
        where: params,
        select: {
          createdAt: true,
          id: true,
          title: true,
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
  @common.Get("/:id/chatMessages")
  @ApiNestedQuery(ChatMessageFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "ChatMessage",
    action: "read",
    possession: "any",
  })
  async findChatMessages(
    @common.Req() request: Request,
    @common.Param() params: ThreadWhereUniqueInput
  ): Promise<ChatMessage[]> {
    const query = plainToClass(ChatMessageFindManyArgs, request.query);
    const results = await this.service.findChatMessages(params.id, {
      ...query,
      select: {
        author: true,
        content: true,
        createdAt: true,
        id: true,
        isRead: true,

        thread: {
          select: {
            id: true,
          },
        },

        timestamp: true,
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

  @common.Post("/:id/chatMessages")
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "update",
    possession: "any",
  })
  async connectChatMessages(
    @common.Param() params: ThreadWhereUniqueInput,
    @common.Body() body: ChatMessageWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      chatMessages: {
        connect: body,
      },
    };
    await this.service.updateThread({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Patch("/:id/chatMessages")
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "update",
    possession: "any",
  })
  async updateChatMessages(
    @common.Param() params: ThreadWhereUniqueInput,
    @common.Body() body: ChatMessageWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      chatMessages: {
        set: body,
      },
    };
    await this.service.updateThread({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.Delete("/:id/chatMessages")
  @nestAccessControl.UseRoles({
    resource: "Thread",
    action: "update",
    possession: "any",
  })
  async disconnectChatMessages(
    @common.Param() params: ThreadWhereUniqueInput,
    @common.Body() body: ChatMessageWhereUniqueInput[]
  ): Promise<void> {
    const data = {
      chatMessages: {
        disconnect: body,
      },
    };
    await this.service.updateThread({
      where: params,
      data,
      select: { id: true },
    });
  }
}