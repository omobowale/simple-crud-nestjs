import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ValidationPipe } from '@nestjs/common';
import { getResponseData } from 'src/helpers/data';
import { JWTAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateTaskDto } from '../dto/create-task-dto';
import { UpdateTaskDto } from '../dto/update-task-dto';
import { TasksService } from '../tasks.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Tasks")
@ApiBearerAuth('jwt')
@Controller('api/v1/tasks')
export class TasksController {
  // Create a constructor to initialize and inject the task service class
  constructor(private readonly tasksService: TasksService) {}

  // Route to get all tasks
  @UseGuards(JWTAuthGuard)
  @Get()
  async getTasks() {
    try {
      return getResponseData(
        false,
        await this.tasksService.getTasks(),
        'Success',
      );
    } catch (err) {
      return getResponseData(true, null, err.message ?? 'Error');
    }
  }

  // Route to get a single task by id
  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async getSingleTask(@Param('id') id: string) {
    try {
      return getResponseData(
        false,
        await this.tasksService.getSingleTask(id),
        'Success',
      );
    } catch (err) {
      return getResponseData(true, null, err.message ?? 'Error');
    }
  }

  //   Route to create a new task
  @UseGuards(JWTAuthGuard)
  @Post()
  async createTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    try {
      return getResponseData(
        false,
        await this.tasksService.createTask(createTaskDto),
        'Success',
      );
    } catch (err) {
      return getResponseData(true, null, err.message ?? 'Error');
    }
  }

  //   Route to get update a single task by id
  @UseGuards(JWTAuthGuard)
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        status: {type: 'string'}
      },
    },
  })
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return getResponseData(
        false,
        await this.tasksService.updateTask(id, updateTaskDto),
        'Success',
      );
    } catch (err) {
      return getResponseData(true, null, err.message ?? 'Error');
    }
  }

  //   Route to delete a single task by id
  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return getResponseData(
        false,
        await this.tasksService.deleteTask(id),
        'Success',
      );
    } catch (err) {
      return getResponseData(true, null, err.message ?? 'Error');
    }
  }
}
