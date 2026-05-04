import { IsString, IsOptional, IsBoolean, IsIn, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TaskPriority } from '../enums/task-priority.enum';

export class QueryTaskDto {
  @ApiPropertyOptional({
    description: 'Filtrar por status de conclusão',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Filtrar por prioridade',
    enum: TaskPriority,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'Buscar por texto no título ou descrição',
    example: 'comprar',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo para ordenação',
    enum: ['title', 'createdAt', 'updatedAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['title', 'createdAt', 'updatedAt'])
  orderBy?: 'title' | 'createdAt' | 'updatedAt';

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
