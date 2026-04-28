import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa', minLength: 3, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ description: 'Descrição detalhada', minLength: 5, maxLength: 500, required: false })
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(500)
  description?: string;
}
