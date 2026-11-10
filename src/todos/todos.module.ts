import { Module } from '@nestjs/common';
import { TodoController } from './todos.controller.js';
import { TodoService } from './todos.service.js';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodosModule {}
