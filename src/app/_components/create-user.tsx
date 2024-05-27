'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function CreateUser() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [user, setUser] = useState<any>(null);

  const createUser = api.user.findOrCreateUser.useMutation({
    onSuccess: (data) => {
      setUser(data);
      setSubmittedName(data.name);
      setName("");
      setEmail("");
    },
  });

  useEffect(() => {
    if (user) {
      console.log('user', user);
      localStorage.setItem('user', JSON.stringify(user));
      // Navigate or perform any action with the user data
      router.push(`categories`);
    }
  }, [user, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length >= 3) {
      createUser.mutate({ name, email });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Input
        className="w-full m-4"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
      />
      <Input
        className="w-full m-4"
        placeholder="Enter your email (optional)"
        value={email}
        onChange={handleEmailChange}
      />
      <Button
        type="submit"
        className="w-full m-4"
        disabled={name.length < 3 || createUser.isLoading}
      >
        {createUser.isLoading ? "Submitting..." : "Start"}
      </Button>
    </form>
  );
}
