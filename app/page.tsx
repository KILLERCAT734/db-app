import { getTasks } from '@/db/queries';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { ListTodo } from 'lucide-react';

export default async function HomePage() {
  const tasks = await getTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <ListTodo className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Мои задачи</h1>
          </div>
          <p className="text-slate-600">
            Всего: {total} | Выполнено: {completed} из {total}
          </p>
        </div>

        {/* Форма добавления */}
        <div className="mb-8">
          <TaskForm />
        </div>

        {/* Список задач */}
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}