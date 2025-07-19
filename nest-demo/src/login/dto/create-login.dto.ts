import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15, {
    message: 'name.length >= 3 && name.length <= 15',
  })
  name: string;
  @IsString()
  age: string;
  constructor() {}
}
