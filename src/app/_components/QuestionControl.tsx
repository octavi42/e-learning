'use client';

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { PaginationItem, PaginationNext, PaginationPrevious } from "~/components/ui/pagination";

export function QuestionControlComponent({ answered, currentPage, totalQuestions }) {
  const router = useRouter();

  console.log('currentPage', currentPage);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/questionResponse', {
        method: 'POST'
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div className="my-2">
      <div className="flex justify-around bg-white py-3 rounded-xl">
        <PaginationPrevious 
          className="w-[20%]" 
          href="#"
          onClick={() => { if (currentPage > 1) router.push(`${currentPage - 1}`) }}
        />
        <Button 
          variant={answered ? "destructive" : "default"} 
          className="w-[20%]" 
          disabled={answered}
          onClick={handleSubmit}
        >
          {answered ? "Answered" : "Submit"}
        </Button>
        <PaginationNext 
          className="w-[20%]" 
          href="#"
          onClick={() => { if (currentPage < totalQuestions) router.push(`${currentPage + 1}`) }}
        />
      </div>
    </div>
  );
}
