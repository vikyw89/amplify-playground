import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ChatMessageModuleBase } from "./base/chatMessage.module.base";
import { ChatMessageService } from "./chatMessage.service";
import { ChatMessageController } from "./chatMessage.controller";
import { ChatMessageResolver } from "./chatMessage.resolver";

@Module({
  imports: [ChatMessageModuleBase, forwardRef(() => AuthModule)],
  controllers: [ChatMessageController],
  providers: [ChatMessageService, ChatMessageResolver],
  exports: [ChatMessageService],
})
export class ChatMessageModule {}
