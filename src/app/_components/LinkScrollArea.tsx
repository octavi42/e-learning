'use client';

import { AccordionHeader } from "@radix-ui/react-accordion";
import * as React from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion";

import { ScrollArea } from "~/components/ui/scroll-area";

export function ScrollAreaDemo({ links }) {

    const [userId, setUserId] = React.useState('');

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser.id);
        }
    }, []);

    return (
        <ScrollArea className="h-full w-full rounded-md border">
            <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                    {links?.map((link) => (
                        <AccordionItem key={link.id} value={link.id}>
                            <AccordionTrigger>{link.title}</AccordionTrigger>
                            <AccordionContent>
                                {link.summary}
                            </AccordionContent>
                            <AccordionContent>
                                <AccordionHeader className="font-bold">Link</AccordionHeader>
                                <a href={link.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    {link.link}
                                </a>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </ScrollArea>
    );
}
