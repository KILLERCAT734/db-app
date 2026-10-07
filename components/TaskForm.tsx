'use client';

import { useRef } from 'react';
import { addTaskAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await addTaskAction(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex gap-3">
      <Input
        name="title"
        placeholder="Что нужно сделать?"
        className="flex-1"
        required
      />
      <Button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Добавить
      </Button>
    </form>
  );
}