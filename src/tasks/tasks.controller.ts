import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // Create a constructor to initialize and inject the task service class
  constructor(private readonly tasksService: TasksService) {}

  // Route to get all tasks
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  // Route to get a single task by id
  @Get(':id')
  getSingleTask(@Param('id') id: number) {
    return this.tasksService.getSingleTask(id);
  }

  //   Route to create a new task
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  //   Route to get update a single task by id
  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  //   Route to delete a single task by id
  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}