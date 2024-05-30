'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertDialogDemo } from "~/app/_components/AlertDialog";
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

        console.log(data);
        
    }, [data]);

    return (
        <main className="relative bg-white h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
            {data?.map((review, index) => (
                <div key={index} className="w-full h-full snap-start flex-shrink-0">
                    <div className="w-full h-full relative">
                        <div className="absolute right-0 top-0 w-full h-[85%] ">
                            <div className="flex flex-row items-center justify-around h-full">
                                <div className="w-[20%] h-[80%]">
                                    <h1 className="text-2xl text-center font-bold text-slate-800">Description</h1>
                                    <p className="text-lg text-slate-800 flex flex-row items-center justify-around h-full">
                                        {review.review}
                                    </p>
                                    <AlertDialogDemo categoryId={review.categoryId} />
                                </div>
                                <div className="w-[20%] h-[80%]">
                                    <h1 className="text-2xl text-center font-bold text-slate-800">Improvements</h1>
                                    <p className="text-lg text-slate-800 flex flex-row items-center justify-around h-full">
                                        {review.improvement}
                                    </p>
                                </div>
                                <div className="w-[20%] h-[80%]">
                                    <h1 className="text-2xl text-center font-bold text-slate-800">Score</h1>
                                    <p className="text-lg text-slate-800 flex flex-row items-center justify-around h-full">
                                        
                                    </p>
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
