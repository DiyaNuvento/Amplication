/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EmailMapWhereUniqueInput } from "./EmailMapWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { EmailMapUpdateInput } from "./EmailMapUpdateInput";

@ArgsType()
class UpdateEmailMapArgs {
  @ApiProperty({
    required: true,
    type: () => EmailMapWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EmailMapWhereUniqueInput)
  @Field(() => EmailMapWhereUniqueInput, { nullable: false })
  where!: EmailMapWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => EmailMapUpdateInput,
  })
  @ValidateNested()
  @Type(() => EmailMapUpdateInput)
  @Field(() => EmailMapUpdateInput, { nullable: false })
  data!: EmailMapUpdateInput;
}

export { UpdateEmailMapArgs as UpdateEmailMapArgs };