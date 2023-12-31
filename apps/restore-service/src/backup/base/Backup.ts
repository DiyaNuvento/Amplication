/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsInt,
  IsString,
  ValidateNested,
  IsOptional,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { Restore } from "../../restore/base/Restore";
import { EnumBackupStatus } from "./EnumBackupStatus";

@ObjectType()
class Backup {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  fileCount!: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  note!: string;

  @ApiProperty({
    required: false,
    type: () => [Restore],
  })
  @ValidateNested()
  @Type(() => Restore)
  @IsOptional()
  restores?: Array<Restore>;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  size!: number;

  @ApiProperty({
    required: true,
    enum: EnumBackupStatus,
  })
  @IsEnum(EnumBackupStatus)
  @Field(() => EnumBackupStatus, {
    nullable: true,
  })
  status?: "Success" | "Failed" | "OnProgress" | "Canceled" | "PartialSuccess";

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}

export { Backup as Backup };
