import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { ChatMessageResolverBase } from "./base/chatMessage.resolver.base";
import { ChatMessage } from "./base/ChatMessage";
import { ChatMessageService } from "./chatMessage.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => ChatMessage)
export class ChatMessageResolver extends ChatMessageResolverBase {
  constructor(
    protected readonly service: ChatMessageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
