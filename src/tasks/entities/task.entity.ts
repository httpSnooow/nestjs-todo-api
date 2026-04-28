import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único da tarefa' })
  id: string;

  @Column({ length: 200 })
  @ApiProperty({ description: 'Título da tarefa', example: 'Comprar leite' })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Descrição detalhada', example: 'Ir ao mercado e comprar 2L', required: false })
  description: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Status de conclusão', default: false })
  completed: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Data da última atualização' })
  updatedAt: Date;
}
