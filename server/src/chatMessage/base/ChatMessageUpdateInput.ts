/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FileUpdateManyWithoutChatMessagesInput } from "./FileUpdateManyWithoutChatMessagesInput";
import {
  ValidateNested,
  IsOptional,
  IsBoolean,
  IsString,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";
import { ThreadWhereUniqueInput } from "../../thread/base/ThreadWhereUniqueInput";

@InputType()
class ChatMessageUpdateInput {
  @ApiProperty({
    required: false,
    type: () => FileUpdateManyWithoutChatMessagesInput,
  })
  @ValidateNested()
  @Type(() => FileUpdateManyWithoutChatMessagesInput)
  @IsOptional()
  @Field(() => FileUpdateManyWithoutChatMessagesInput, {
    nullable: true,
  })
  files?: FileUpdateManyWithoutChatMessagesInput;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
  })
  isRead?: boolean | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  text?: string | null;

  @ApiProperty({
    required: false,
    type: () => ThreadWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ThreadWhereUniqueInput)
  @IsOptional()
  @Field(() => ThreadWhereUniqueInput, {
    nullable: true,
  })
  thread?: ThreadWhereUniqueInput | null;
}

export { ChatMessageUpdateInput as ChatMessageUpdateInput };
