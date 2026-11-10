import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todos.service.js';
import type { CreateTodoDto } from './dto/create-todo.dto.js';
import type { UpdateTodoDto } from './dto/update-todo.dto.js';

// HTTP layer only. No business logic, no storage — just routes that call
// the service and let Nest turn the return value into a JSON response.
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todoService.getTodo(id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTodo(@Param('id') id: string) {
    this.todoService.deleteTodo(id);
  }
}
