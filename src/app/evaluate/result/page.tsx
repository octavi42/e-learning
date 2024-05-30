'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertDialogDemo } from "~/app/_components/AlertDialog";
import { AlertDialogLinks } from "~/app/_components/ReviewList";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";

export default function Home() {
    const [userId, setUserId] = useState('');

    const { data, isLoading: isLoadingQuestions, error: errorQuestions } = api.user.getRevies.useQuery({ userId });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id); // Assuming the user object has an id field
        }

        console.log("data", data);
        
    }, [data]);

    return (
        <main className="relative bg-white h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
            {data?.map((review, index) => (
                <div key={index} className="w-full h-full snap-start flex-shrink-0">
                    <div className="w-full h-full relative">
                        <div className="relative h-9 w-full flex justify-center items-center mb-10">
                            <h1 className="mt-14 font-bold">{review.category.name}</h1>
                        </div>
                        <div className="absolute right-0 top-8 w-full h-[80%] ">
                            <div className="flex flex-row items-center justify-around h-full">
                                <div className="w-[20%] h-[80%]">
                                    <h1 className="text-xl text-center font-bold text-slate-700">Description</h1>
                                    <p className="text-lg text-slate-800 flex flex-row items-center justify-around h-full">
                                        {review.review}
                                    </p>
                                    <AlertDialogDemo categoryId={review.categoryId} />
                                </div>
                                <div className="w-[20%] h-[80%]">
                                    <h1 className="text-xl text-center font-bold text-slate-700">Improvements</h1>
                                    <p className="text-lg text-slate-800 flex flex-row items-center justify-around h-full">
                                        {review.improvement}
                                    </p>
                                </div>
                                <div className="w-[20%] h-[80%]">
                                    <h1 className="text-xl text-center font-bold text-slate-700">Learning Sources</h1>
                                    <p className="text-lg text-slate-800 flex flex-row items-center justify-around h-full">
                                        {review.source}
                                    </p>
                                    <AlertDialogLinks links={review.links} />
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 w-full flex justify-center items-center mb-10">
                            <Progress value={review.score} className="w-[60%] bg-slate-300" />
                            <p className="ml-14">{review.score}</p>
                        </div>
                    </div>
                    <Separator />
                </div>
            ))}
        </main>
    );
}