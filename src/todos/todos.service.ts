import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Todo } from './todo.model.js';
import type { CreateTodoDto } from './dto/create-todo.dto.js';
import type { UpdateTodoDto } from './dto/update-todo.dto.js';

// Business logic + the in-memory store.
// No HTTP concepts here (no Request/Response, no status codes) — except
@Injectable()
export class TodoService {
  private readonly todos = new Map<string, Todo>();

  getAllTodos(): Todo[] {
    return [...this.todos.values()];
  }

  getTodo(id: string): Todo {
    const todo = this.todos.get(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return todo;
  }

  createTodo(dto: CreateTodoDto): Todo {
    const now = new Date();
    const todo: Todo = {
      id: randomUUID(),
      title: dto.title,
      completed: dto.completed ?? false,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  updateTodo(id: string, dto: UpdateTodoDto): Todo {
    const todo = this.getTodo(id); // throws 404 if the id is unknown
    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.completed !== undefined) todo.completed = dto.completed;
    todo.updatedAt = new Date();
    return todo;
  }

  deleteTodo(id: string): void {
    this.getTodo(id); // throws 404 
    this.todos.delete(id);
  }
}
