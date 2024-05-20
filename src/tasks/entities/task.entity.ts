import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatusEnum {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatusEnum.PENDING })
  status: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;
}
