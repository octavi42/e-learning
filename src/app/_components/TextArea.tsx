'use client';

import { Textarea } from "~/components/ui/textarea";

export function TextareaForm({ answered, answer }) {
  return (
    <div className="w-full">
        <Textarea
          placeholder={answered ? answer : "Enter your answer here"}
          className="resize-none min-w-full"
          disabled={answered}
        />
    </div>
  );
}
