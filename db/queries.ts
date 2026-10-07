import { db } from './db';
import { tasks } from './schema';
import { eq } from 'drizzle-orm';

// Получить все задачи
export async function getTasks() {
  return db.select().from(tasks);
}

// Добавить задачу
export async function createTask(title: string) {
  return db.insert(tasks).values({ title }).returning();
}

// Удалить задачу
export async function deleteTask(id: number) {
  return db.delete(tasks).where(eq(tasks.id, id));
}

// Переключить статус выполнено/нет
export async function toggleTask(id: number, completed: boolean) {
  return db.update(tasks).set({ completed }).where(eq(tasks.id, id));
}