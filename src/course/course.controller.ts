import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteForbiddenException } from 'src/forbidden.exception';
import { User } from 'src/users/schema/user.schema';
import { InsertAlunosDto } from './dto/insert-aluno.dto';
import { Public } from 'src/auth/decorators/auth.decorator';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    try {
      return this.courseService.create(createCourseDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Erro ao cadastrar o cursos',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
  

  @Post('aluno')
  insertAlunos(@Body() insertAlunosDto:InsertAlunosDto ){
    try {

      return this.courseService.insertAlunos(insertAlunosDto);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Erro ao inserir alunos no cursos',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get('alunosbycourse')
  alunosByCurso(@Body('name') name: string){
    return this.courseService.alunosByCurso(name);
  }

  @Get()
  findAll() {
    try {
    return this.courseService.findAll();
     } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Erro ao buscar todos os cursos',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    try {  
    return this.courseService.findById(id);
     } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Erro ao buscar o curso por id',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    try {
    return this.courseService.update(id, updateCourseDto);
     } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Erro ao atualizar o curso',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
    return this.courseService.remove(id);
     } catch (error) {
      throw new DeleteForbiddenException()
    }  
  }
}
