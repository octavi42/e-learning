'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [results, setResults] = useState({});
    const [user, setUser] = useState({});

    const { data: userData } = api.user.getUserById.useQuery({ id: userId });
    const { mutate: createUser } = api.user.setReview.useMutation();
    const { mutate: changeUserEvaluation } = api.user.changeUserEvaluation.useMutation();
    const router = useRouter();

    // Fetch user ID from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id); // Assuming the user object has an id field
        }
    }, []);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }

        console.log('User data:', userData);
    }, [userData]);

    // Fetch all categories and their questions
    const { data: categoriesWithQuestions, isLoading: isLoadingCategories, error: errorCategories } = api.questions.getQuestionsOnCategory.useQuery({ userId });

    // Handle submit for all categories
    const handleSubmit = async () => {
        setIsLoading(true);
        const categoryResults = {};

        if (user.evaluation) {
            router.push('/evaluate/result');
            return;
        }

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

            // Batch the requests
            const reviewRequests = formattedData.map(({ category_id, questions }) =>
                fetch('/api/performanceReview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category_review: questions })
                }).then(res => {
                    if (!res.ok) {
                        return res.text().then(errorMessage => {
                            throw new Error(`Network response was not ok: ${res.status} ${res.statusText} - ${errorMessage}`);
                        });
                    }
                    return res.json();
                })
            );

            // Execute all requests in parallel
            const reviewResults = await Promise.all(reviewRequests);

            reviewResults.forEach((data, index) => {
                const { category_id } = formattedData[index];
                categoryResults[category_id] = data;

                createUser({
                    userId: userId,
                    category: category_id,
                    review: data.description,
                    improvement: data.improvement,
                    score: data.score,
                    source: data.sources_description,
                    links: data.sources
                });
            });

            setResults(categoryResults);
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
            changeUserEvaluation({ userId, evaluation: true });
            router.push('/evaluate/result');
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
                    <Button onClick={handleSubmit} disabled={isLoading || isLoadingCategories} className="hover:bg-blue-400 hover:text-blue-950 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? (
                            <>
                                <span>Submitting...</span>
                                <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </>
                        ) : (
                            'Evaluate'
                        )}
                    </Button>
                </div>
                {/* <AlertDialogDemo /> */}
                {isLoadingCategories && <p className="text-center text-gray-500">Loading categories and questions...</p>}
                {errorCategories && <p className="text-center text-red-500">Error loading categories: {errorCategories.message}</p>}
            </div>
        </main>
    );
}
