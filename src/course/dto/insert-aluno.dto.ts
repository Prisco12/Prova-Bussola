import { IsString, IsNotEmpty, IsNumber, IsArray, ArrayMinSize } from 'class-validator';
import { User } from 'src/users/schema/user.schema';

export class InsertAlunosDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    alunos: string
}
