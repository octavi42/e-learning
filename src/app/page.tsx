'use client';

import { CreateUser } from "./_components/create-user";  // Adjust the import path as necessary

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a3eab0] to-[#bfc6c1] ">
      <p>Welcome to the e-learning platform</p>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="w-1/3">
          <CreateUser />
        </div>
      </div>
    </main>
  );
}
