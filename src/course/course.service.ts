import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schema/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseInterface } from './interface/course.interface';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InsertAlunosDto } from './dto/insert-aluno.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private readonly usersService: UsersService
  ) { }


  async create(createCourseDto: CreateCourseDto): Promise<CourseInterface> {
    const course = new this.courseModel(createCourseDto)
    return course.save()
  }

  async insertAlunos(insertDtoAlunos: InsertAlunosDto) {
    const curso = await this.courseModel.findOne({ name: insertDtoAlunos.name })
    const aluno = await this.usersService.findById(insertDtoAlunos.alunos)
    curso.alunos.push(aluno)
    return await this.courseModel.findOneAndUpdate({ name: insertDtoAlunos.name }, { $set: curso }, { new: true }).exec()
  }

  async alunosByCurso(name: string) {
    const aluno = await this.courseModel.findOne({ name: name }).exec()

    return aluno.alunos
  }

  findAll() {
    return this.courseModel.find();
  }

  findById(id: string) {
    return this.courseModel.findById(id);
  }

  async findByName(name: string) {
    return await this.courseModel.findOne({ name: name }).exec()
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseInterface> {
    return this.courseModel.findByIdAndUpdate({ _id: id }, { $set: updateCourseDto }, { new: true });
  }

  remove(id: string) {
    return this.courseModel.deleteOne({ _id: id });
  }
}
