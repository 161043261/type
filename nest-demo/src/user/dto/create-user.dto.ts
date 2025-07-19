import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'whoami' })
  name: string;
  @ApiProperty({
    example: 22,
    type: 'number',
    required: true,
    enum: [22, 23, 24],
  })
  age: number;
}
