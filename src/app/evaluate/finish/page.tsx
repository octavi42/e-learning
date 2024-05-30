'use client';

import { useEffect, useState } from "react";
import { AlertDialogDemo } from "~/app/_components/AlertDialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [results, setResults] = useState({});
    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

    const createUser = api.user.setReview.useMutation({});

    // Fetch user ID from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id); // Assuming the user object has an id field
        }
    }, []);

    // Fetch all categories and their questions
    const { data: categoriesWithQuestions, isLoading: isLoadingCategories, error: errorCategories } = api.questions.getQuestionsOnCategory.useQuery({ userId });

    // Handle submit for all categories
    const handleSubmit = async () => {
        setIsLoading(true);
        const categoryResults = {};

        try {
            const formattedData = categoriesWithQuestions.map(({ category, questions }) => ({
                category: category.name,
                category_id: category.id,
                questions: questions.map(question => ({
                    question: question.question,
                    answer: question.answers[0]?.answer,
                    review: question.answers[0]?.review,
                })),
            }));

            console.log('Formatted data:', formattedData);
            
            formattedData.forEach(async ({ category_id, questions }) => {

                const res = await fetch('/api/performanceReview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category_review: questions })
                });

                if (!res.ok) {
                    const errorMessage = await res.text();
                    console.error('Error message:', errorMessage);
                    throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                formattedData.forEach(({ category }) => {
                    categoryResults[category] = data[category];
                });

                console.log('Results:', data);

                createUser.mutate({ userId: userId, category: category_id, review: data.description, improvement: data.improvement, score: data.score });
            })

            // setResults(categoryResults);
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="relative h-screen w-screen flex items-center justify-center bg-white">
            <div className="rounded-lg p-8 w-[80%] max-w-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Performance Review Evaluation</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Welcome! This software uses AI to evaluate your performance based on your answers to various questions. 
                    The AI will provide insights on how well you performed in each category, suggest areas for improvement, 
                    and offer relevant resources to help you enhance your skills.
                </p>
                <div className="flex justify-center mb-4">
                    <Button onClick={handleSubmit} disabled={isLoading || isLoadingCategories || isFetchingQuestions} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? 'Submitting...' : 'Evaluate'}
                    </Button>
                </div>
                <AlertDialogDemo />
                {isLoadingCategories && <p className="text-center text-gray-500">Loading categories...</p>}
                {errorCategories && <p className="text-center text-red-500">Error loading categories: {errorCategories.message}</p>}
                <div className="mt-6">
                    {Object.entries(results).map(([category, result]) => (
                        <div key={category} className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                            <p className="text-lg text-gray-700">Description: {result.description}</p>
                            <p className="text-lg text-gray-700">Improvement: {result.improvement}</p>
                            <p className="text-lg text-gray-700">Score: {result.score}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
