import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TodoItem } from "./TodoItem";
import { Plus } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Todo App</h1>
          <p className="text-muted-foreground">
            Stay organized and productive
          </p>
          {totalCount > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              {completedCount} of {totalCount} completed
            </div>
          )}
        </div>

        {/* Add Todo Input */}
        <Card className="p-4 mb-6 shadow-lg border-0" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="flex gap-2">
            <Input
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary"
            />
            <Button 
              onClick={addTodo} 
              disabled={!newTodo.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <Card className="p-8 text-center border-0" style={{ boxShadow: 'var(--card-shadow)' }}>
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">No todos yet</p>
                <p className="text-sm">Add your first task above to get started!</p>
              </div>
            </Card>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};