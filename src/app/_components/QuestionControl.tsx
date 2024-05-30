'use client';

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { PaginationItem, PaginationNext, PaginationPrevious } from "~/components/ui/pagination";
import { api } from "~/trpc/react";

export function QuestionControlComponent({ answered, nextCategory, previousCategory, currentPage, totalQuestions, question, answer, expectedAnswer, questionId, userId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const createAnswer = api.answer.create.useMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/questionResponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer, expectedAnswer })
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error('Error message:', errorMessage);
        throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      // Create the answer using TRPC
      createAnswer.mutate({ answer, questionId, userId, correct: data.correct, rating: data.score, review: data.reason });

      if (currentPage === totalQuestions) {
        router.push(`/evaluate/${nextCategory}/1`);
        return
      }
      router.push(`${currentPage + 1}`);

    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-2">
      <div className="flex justify-around bg-[#dbe2e2] py-3 rounded-xl">
        <PaginationPrevious 
          className="w-[20%]" 
          href="#"
          onClick={() => { 
            console.log('currentPage', currentPage);
            if (currentPage === 1) {
              router.push(`/evaluate/${previousCategory}/${totalQuestions}`);
              return
            }
            router.push(`${currentPage - 1}`);
           }}
        />
        <Button 
          variant={answered ? "destructive" : "default"} 
          className="w-[20%]" 
          disabled={answered || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Submitting..." : answered ? "Answered" : "Submit"}
        </Button>
        <PaginationNext 
          className="w-[20%]" 
          href="#"
          onClick={() => { 
            if (currentPage === totalQuestions) {
              router.push(`/evaluate/${nextCategory}/1`);
              return
            }
            router.push(`${currentPage + 1}`);
           }}
        />
      </div>
    </div>
  );
}
