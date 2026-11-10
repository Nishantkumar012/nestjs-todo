// The shape of the POST /todos request body.
export class CreateTodoDto {
  title!: string; // required, non-empty
  completed?: boolean; // optional, defaults to false
}
