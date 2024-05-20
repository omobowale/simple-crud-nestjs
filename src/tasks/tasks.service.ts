import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks() {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async getSingleTask(id: string) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(
        `Could not find specified task with id: ${id}`,
      );
    }
    return task;
  }

  async createTask(task: CreateTaskDto) {
    return await this.taskRepository.save(task);
  }

  async updateTask(id: string, task: UpdateTaskDto) {
    const result = await this.taskRepository.update(id, task);
    return task;
  }

  async deleteTask(id: string) {
    const result = await this.taskRepository.delete(id);
    return result;
  }
}
