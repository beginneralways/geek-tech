import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, default: "prashantkayastha67@gmail.com" })
  email: string;

  @ApiProperty({ type: String })
  password: string;






}
