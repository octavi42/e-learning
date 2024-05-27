'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { CategoryList } from "../_components/display-categories";
import LoadingSpinner from "../_components/LoadingSpinner";
// import CategoryList from "./CategoryList"; // Adjust the import path as necessary

export default function Home() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const { data, isLoading, error } = api.questions.getCategorys.useQuery();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleSelectCategory = (categoryId) => {
    router.push(`evaluate/${categoryId}`);
  };

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a3eab0] to-[#bfc6c1] p-6">
      <h1 className="text-4xl font-bold mb-8">E-Learning Programming Categories</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error loading categories</div>
      ) : (
        <CategoryList categories={categories} onSelectCategory={handleSelectCategory} />
      )}
    </main>
  );
}
