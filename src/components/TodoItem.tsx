import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { Todo } from "./TodoApp";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 150);
  };

  return (
    <Card 
      className={`p-4 border-0 transition-all duration-200 hover:shadow-lg ${
        isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      } ${todo.completed ? 'bg-success-soft' : 'bg-card'}`}
      style={{ boxShadow: todo.completed ? 'var(--card-shadow)' : 'var(--card-shadow)' }}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="data-[state=checked]:bg-success data-[state=checked]:border-success"
        />
        
        <span 
          className={`flex-1 transition-all duration-200 ${
            todo.completed 
              ? 'line-through text-muted-foreground' 
              : 'text-card-foreground'
          }`}
        >
          {todo.text}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};