// The shape of the PATCH /todos/:id request body.
// All fields optional, since a partial update should only change what was sent.
export class UpdateTodoDto {
  title?: string;
  completed?: boolean;
}
