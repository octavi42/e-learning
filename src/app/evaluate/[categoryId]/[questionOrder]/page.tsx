'use client';

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DropdownMenuRadioGroupDemo } from "~/app/_components/CategoryDropdown";
import { TextareaForm } from "~/app/_components/TextArea";
import { Skeleton } from "~/components/ui/skeleton";
import { PaginationDemo } from "~/app/_components/Pagination";
import { QuestionControlComponent } from "~/app/_components/QuestionControl";
import { AlertDemo } from "~/app/_components/DoneAlert";

export default function Home() {
  const params = useParams();
  const questionOrder = Number(params.questionOrder);
  const categoryId = String(params.categoryId);
  const [userId, setUserId] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id); // Assuming the user object has an id field
    }
  }, []);

  const { data, isLoading, error } = api.questions.getFilteredQuestion.useQuery({ categoryId, questionOrder, userId });
  const { data: questionsData, isLoading: isLoadingQuestions, error: errorQuestions } = api.questions.getQuestions.useQuery({ categoryId });
  const { data: answeredQuestions } = api.questions.getIfQuestionsAnswered.useQuery({ userId });
  const { data: categories } = api.questions.getCategorys.useQuery();
  
  const categoryOrder = categories?.find((category) => category.id === categoryId)?.order;
  const nextCategoryOrder = categoryOrder ? categoryOrder + 1 : null;
  const nextCategoryId = nextCategoryOrder !== null ? categories?.find((category) => category.order === nextCategoryOrder)?.id : null;
  const previousCategoryOrder = categoryOrder ? categoryOrder - 1 : null;
  const previousCategoryId = previousCategoryOrder !== null ? categories?.find((category) => category.order === previousCategoryOrder)?.id : null;
  

  const isAnswered = data ? (data.answered !== undefined ? data.answered : true) : true;

  useEffect(() => {
    if (data && data.answer) {
      setAnswer(data.answer);
    }
  }, [data]);

  return (
    <main className="">
      <div className="fixed mt-10 ml-28">
        <DropdownMenuRadioGroupDemo paramCategotyId={categoryId} />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {isLoading ? (
          <div className="w-full max-w-4xl bg-white rounded-lg p-6 mb-4">
            <Skeleton className="h-8 w-full mb-4" /> {/* Placeholder for the question text */}
            <Skeleton className="h-32 w-full" /> {/* Placeholder for the textarea */}
          </div>
        ) : (
          data && (
            <div className="w-full max-w-4xl bg-white rounded-lg p-6 mb-4">
              <h2 className={`text-2xl font-light mb-2 text-slate-800`}>
                {data.question}
              </h2>

              <div className="container flex flex-col items-center justify-center px-4 pt-10 ">
                <div className="w-full">
                  <TextareaForm answered={data.answered} answer={answer} setAnswer={setAnswer} />
                </div>
              </div>
            </div>
          )
        )}
        <div className="w-full max-w-4xl rounded-lg p-2 mb-4">
          {questionsData ? (
            <>
              <QuestionControlComponent 
                answered={isAnswered} 
                nextCategory={nextCategoryId}
                previousCategory={previousCategoryId}
                currentPage={questionOrder} 
                totalQuestions={questionsData.length} 
                question={data?.question} 
                answer={answer} 
                expectedAnswer="Replace this with the expected answer" // Replace this with actual expected answer
                questionId={data?.id}
                userId={userId}
              />
              <PaginationDemo questions={questionsData} currentPage={questionOrder} />
            </>
          ) : (
            <div className="h-14 w-full bg-white" />
          )}
        </div>
        
        {answeredQuestions && <AlertDemo />}
      </div>
    </main>
  );
}
