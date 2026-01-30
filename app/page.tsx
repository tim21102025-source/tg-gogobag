"use client";

import { Suspense, useEffect, useState } from 'react';
import Image from "next/image";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import dynamic from 'next/dynamic';

// Створюємо клієнтський компонент для TaskBoard
const TaskBoardClient = dynamic(() => Promise.resolve(TaskBoard), {
  ssr: false
});

function TaskBoard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const launchParams = useLaunchParams();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Отримуємо user ID з Telegram launch params
        const telegramUserId = launchParams?.user?.id?.toString();

        if (telegramUserId) {
          console.log("Telegram User ID:", telegramUserId);
          setUserId(telegramUserId);
        } else {
          console.warn("No Telegram user ID available, using fallback");
          setUserId("anonymous-user-" + Date.now()); // унікальний fallback для анонімних тестів
        }
      } catch (error) {
        console.error("Error initializing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [launchParams]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  // Якщо userId не отримано — показуємо повідомлення, але продовжуємо рендер (можна видалити)
  if (!userId) {
    return (
      <div className="p-8 text-yellow-500">
        Не вдалося отримати ID користувача з Telegram. Використовуємо анонімний режим.
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8 bg-gray-900 text-white">
      <header className="flex items-center justify-between">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className="text-2xl font-bold">GoGoBag Shipping - User {userId.slice(0, 6)}...</h1>
      </header>

      <main className="flex flex-col gap-8">
        <TaskForm userId={userId} />  {/* Передаємо userId замість groupId */}
        <TaskList userId={userId} />  {/* Передаємо userId замість groupId */}
      </main>

      <footer className="flex justify-center text-sm text-gray-500">
        Powered by Next.js & Firebase
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <TaskBoardClient />
    </Suspense>
  );
}