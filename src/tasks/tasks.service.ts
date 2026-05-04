import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriority } from './enums/task-priority.enum';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: string;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(completed?: boolean, priority?: TaskPriority): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (completed !== undefined) {
      query.andWhere('task.completed = :completed', { completed });
    }

    if (priority !== undefined) {
      query.andWhere('task.priority = :priority', { priority });
    }

    query.orderBy('task.createdAt', 'DESC');

    return query.getMany();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID "${id}" não encontrada.`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    const saved = await this.taskRepository.save(task);
    this.logger.log(`[CREATE] Tarefa criada: "${saved.title}" (ID: ${saved.id}, Prioridade: ${saved.priority})`);
    return saved;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    const updated = Object.assign(task, updateTaskDto);
    const saved = await this.taskRepository.save(updated);
    this.logger.log(`[UPDATE] Tarefa atualizada: "${saved.title}" (ID: ${saved.id})`);
    return saved;
  }

  async updateStatus(id: string, completed: boolean): Promise<Task> {
    const task = await this.findOne(id);
    task.completed = completed;
    const saved = await this.taskRepository.save(task);
    this.logger.log(`[UPDATE_STATUS] Tarefa "${saved.title}" (ID: ${saved.id}) marcada como ${completed ? 'concluída' : 'pendente'}`);
    return saved;
  }

  async toggleStatus(id: string): Promise<Task> {
    const task = await this.findOne(id);
    task.completed = !task.completed;
    const saved = await this.taskRepository.save(task);
    this.logger.log(`[TOGGLE] Tarefa "${saved.title}" (ID: ${saved.id}) alternada para ${saved.completed ? 'concluída' : 'pendente'}`);
    return saved;
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.delete(id);
    this.logger.log(`[DELETE] Tarefa removida: "${task.title}" (ID: ${id})`);
  }

  async getStats(): Promise<TaskStats> {
    const [total, completed, high, medium, low] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.count({ where: { completed: true } }),
      this.taskRepository.count({ where: { priority: TaskPriority.HIGH } }),
      this.taskRepository.count({ where: { priority: TaskPriority.MEDIUM } }),
      this.taskRepository.count({ where: { priority: TaskPriority.LOW } }),
    ]);

    const pending = total - completed;
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) + '%' : '0%';

    return {
      total,
      completed,
      pending,
      completionRate,
      byPriority: { high, medium, low },
    };
  }
}
