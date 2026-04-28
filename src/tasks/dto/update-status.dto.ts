import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({ description: 'Novo status de conclusão' })
  @IsBoolean()
  completed: boolean;
}
