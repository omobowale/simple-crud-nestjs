import {MinLength} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  id: string;

  @ApiProperty()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @MinLength(10)
  description: string;

  status: string;
}
