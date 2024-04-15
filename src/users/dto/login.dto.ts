//login dto

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ type: String, default: 'prashantkayastha67@gmail.com' })
    email: string;

    @ApiProperty({ type: String, default: 'string' })
    password: string;
}
