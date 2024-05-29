'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import LoadingSpinner from "../../_components/LoadingSpinner"; // Adjust the import path as necessary

export default function Home() {
  const params = useParams();
  const categoryId = params.category; // Assuming 'category' is the parameter name
  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState('');

  // Fetch userId from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id); // Assuming the user object has an id field
    }
  }, []);

  const { data, isLoading, error } = api.questions.getFilteredQuestions.useQuery({ category: categoryId, userId });

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading questions</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a3eab0] to-[#bfc6c1] p-6">
      <h1 className="text-4xl font-bold mb-8">Questions in {categoryId}</h1>
      <div className="w-full max-w-4xl">
        {questions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-semibold mb-2">{question.question}</h2>
            <p className={`text-${question.answered ? 'green' : 'red'}-500`}>
              {question.answered ? 'Answered' : 'Not Answered'}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
