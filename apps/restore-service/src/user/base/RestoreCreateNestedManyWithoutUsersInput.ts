/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { RestoreWhereUniqueInput } from "../../restore/base/RestoreWhereUniqueInput";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
class RestoreCreateNestedManyWithoutUsersInput {
  @Field(() => [RestoreWhereUniqueInput], {
    nullable: true,
  })
  @ApiProperty({
    required: false,
    type: () => [RestoreWhereUniqueInput],
  })
  connect?: Array<RestoreWhereUniqueInput>;
}

export { RestoreCreateNestedManyWithoutUsersInput as RestoreCreateNestedManyWithoutUsersInput };
