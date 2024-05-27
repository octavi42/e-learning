'use client';

import { Button } from "~/components/ui/button";

export const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
          <h2 className="text-2xl font-semibold mb-2">{cat.name}</h2>
          <p className="text-gray-700 mb-4">{cat.summary}</p>
          <Button className="mt-auto" onClick={() => onSelectCategory(cat.name)}>Explore {cat.name}</Button>
        </div>
      ))}
    </div>
  );
}
