'use client';

import { useState, useTransition } from 'react';
import { deleteTaskAction, toggleTaskAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Check, Circle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  function handleDelete(id: number) {
    setDeletingId(id);
    startTransition(async () => {
      await deleteTaskAction(id);
      setDeletingId(null);
    });
  }

  function handleToggle(id: number, completed: boolean) {
    startTransition(async () => {
      await toggleTaskAction(id, !completed);
    });
  }

  if (tasks.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-slate-500 text-lg">Пока нет ни одной задачи</p>
        <p className="text-slate-400 text-sm mt-2">
          Добавьте первую задачу через форму выше
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`p-4 flex items-center gap-4 transition-opacity ${
            deletingId === task.id ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Кнопка переключения статуса */}
          <button
            onClick={() => handleToggle(task.id, task.completed)}
            disabled={isPending}
            className="shrink-0"
          >
            {task.completed ? (
              <Check className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-slate-300 hover:text-slate-500" />
            )}
          </button>

          {/* Название задачи */}
          <span
            className={`flex-1 text-slate-800 ${
              task.completed ? 'line-through text-slate-400' : ''
            }`}
          >
            {task.title}
          </span>

          {/* Кнопка удаления */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(task.id)}
            disabled={isPending}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </Card>
      ))}
    </div>
  );
}