import { IsString, IsNotEmpty, IsNumber, IsArray, ArrayMinSize, IsObject } from 'class-validator';
import { User } from 'src/users/schema/user.schema';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    value: number

    @IsNumber()
    @IsNotEmpty()
    duration: number

    @IsArray()
    alunos: User[]
}
