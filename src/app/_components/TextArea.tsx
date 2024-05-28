'use client';

import { Textarea } from "~/components/ui/textarea";

export function TextareaForm({ answered, answer, setAnswer }) {
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="w-full">
      <Textarea
        placeholder={answered ? answer : "Enter your answer here"}
        className="resize-none min-w-full"
        disabled={answered}
        value={answered ? answer : undefined}
        onChange={handleChange}
      />
    </div>
  );
}
