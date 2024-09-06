/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import {
  Prisma,
  Thread as PrismaThread,
  ChatMessage as PrismaChatMessage,
} from "@prisma/client";

export class ThreadServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(args: Omit<Prisma.ThreadCountArgs, "select">): Promise<number> {
    return this.prisma.thread.count(args);
  }

  async threads(args: Prisma.ThreadFindManyArgs): Promise<PrismaThread[]> {
    return this.prisma.thread.findMany(args);
  }
  async thread(
    args: Prisma.ThreadFindUniqueArgs
  ): Promise<PrismaThread | null> {
    return this.prisma.thread.findUnique(args);
  }
  async createThread(args: Prisma.ThreadCreateArgs): Promise<PrismaThread> {
    return this.prisma.thread.create(args);
  }
  async updateThread(args: Prisma.ThreadUpdateArgs): Promise<PrismaThread> {
    return this.prisma.thread.update(args);
  }
  async deleteThread(args: Prisma.ThreadDeleteArgs): Promise<PrismaThread> {
    return this.prisma.thread.delete(args);
  }

  async findChatMessages(
    parentId: string,
    args: Prisma.ChatMessageFindManyArgs
  ): Promise<PrismaChatMessage[]> {
    return this.prisma.thread
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .chatMessages(args);
  }
}