import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}
  private tasks = [
    { id: 1, title: 'Title 1', description: 'Description 1' },
    { id: 2, title: 'Title 2', description: 'Description 2' },
    { id: 3, title: 'Title 3', description: 'Description 3' },
  ];

  getTasks() {
    return this.taskRepository.findAll();
  }

  getSingleTask(id: number) {
    return this.tasks.find((task) => task.id == id);
  }

  createTask(task: CreateTaskDto) {
    return this.taskRepository.create(task as any);
  }

  updateTask(id: number, task: UpdateTaskDto) {
    this.tasks = this.tasks.map((t) => {
      if (t.id == id) {
        return { ...t, ...task };
      } else {
        return t;
      }
    });

    return this.getSingleTask(id);
  }

  deleteTask(id: number) {
    const task = this.getSingleTask(id);

    this.tasks = this.tasks.filter((task) => task.id == id);

    return task;
  }
}
