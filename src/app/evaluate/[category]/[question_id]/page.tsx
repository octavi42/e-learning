'use client';

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useParams } from 'next/navigation'

export default async function Home() {
    const params = useParams()

    const questionId = params.question_id;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a3eab0] to-[#bfc6c1] ">
        <p>{questionId}</p>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="w-1/3">
            <Input className="w-full m-4" placeholder="Enter your name" />
            <Input className="w-full m-4" placeholder="Enter your mail" />
        </div>
        <Button>Start</Button>
      </div>
    </main>
  );
}