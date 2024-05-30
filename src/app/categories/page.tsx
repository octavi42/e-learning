'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { CategoryList } from "../_components/display-categories";
import LoadingSpinner from "../_components/LoadingSpinner";
import { AccordionDemo } from "../_components/CategoriesOverviewAcordion";
import { Button } from "~/components/ui/button";
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <h1 className="text-4xl font-bold mb-8">Categories Overview</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error loading categories</div>
      ) : (
        // <CategoryList categories={categories} onSelectCategory={handleSelectCategory} />
        <AccordionDemo categories={categories} />
      )}
      <Button className="mt-20" onClick={() => {router.push(`/evaluate/${categories[0]?.id}/1`)}}>Start</Button>
    </main>
  );
}
