import { IsString, IsInt, IsNotEmpty, IsEmail, IsArray, ArrayMinSize } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}
