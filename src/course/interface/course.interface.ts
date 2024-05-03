import { User } from "src/users/schema/user.schema"

export interface CourseInterface {
    name: string
    value: number
    duration: number
    alunos: User[]
}