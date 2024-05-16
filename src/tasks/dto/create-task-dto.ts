import {MinLength} from 'class-validator'

export class CreateTaskDto {
  id: number;

  @MinLength(3)
  title: string;

  @MinLength(10)
  description: string;
  status: string;
}
