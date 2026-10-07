'use server';

import { createTask, deleteTask, toggleTask } from '@/db/queries';
import { revalidatePath } from 'next/cache';

export async function addTaskAction(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title || title.trim() === '') return;

  await createTask(title.trim());
  revalidatePath('/');
}

export async function deleteTaskAction(id: number) {
  await deleteTask(id);
  revalidatePath('/');
}

export async function toggleTaskAction(id: number, completed: boolean) {
  await toggleTask(id, completed);
  revalidatePath('/');
}