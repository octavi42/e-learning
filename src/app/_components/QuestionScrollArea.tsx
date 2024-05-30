'use client';

import { useSearchParams } from "next/navigation";
import * as React from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion";

import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/react";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function ScrollAreaDemo({categoryId}) {
    const searchParams = useSearchParams();

    const [userId, setUserId] = React.useState('');

React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id); // Assuming the user object has an id field
    }
  }, []);

    React.useEffect(() => {
        if (categoryId) {
            console.log('Category ID:', categoryId);
        } else {
            console.log('Category ID is null');
        }

        console.log('Search Params:', Object.fromEntries(searchParams.entries()));
    }, [categoryId, searchParams]);

    const { data: questionsData, isLoading: isLoadingQuestions, error: errorQuestions } = api.questions.getUserQuestions.useQuery(
        { categoryId: categoryId ?? '', userId: userId},
        {
            enabled: categoryId !== null,
        }
    );

    if (isLoadingQuestions) {
        return <div>Loading...</div>;
    }

    if (errorQuestions) {
        return <div>Error loading questions: {errorQuestions.message}</div>;
    }

    return (
        <ScrollArea className="h-full w-full rounded-md border">
            <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                    {questionsData?.map((question) => (
                        <AccordionItem key={question.id} value={question.id}>
                            <AccordionTrigger>{question.question}</AccordionTrigger>
                            <AccordionContent>
                                {question.review}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </ScrollArea>
    );
}
