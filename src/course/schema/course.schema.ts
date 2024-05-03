import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {

  @Prop({required: true})
  name: string;
 
  @Prop({required: true})
  value: number;
 
  @Prop({required: true})
  duration: number;
 
  @Prop({ required: true})
  alunos: User[];


}

export const CourseSchema = SchemaFactory.createForClass(Course);