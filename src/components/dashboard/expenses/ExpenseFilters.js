// src/components/expenses/ExpenseFilters.js
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ExpenseFilters({
  expenseCategories,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="flex flex-wrap gap-2">
        {expenseCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(category.id)}
            className={
              selectedCategory === category.id
                ? "bg-green-600 hover:bg-green-700"
                : ""
            }
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>
      <div className="relative w-full sm:w-64">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="খরচ খুঁজুন..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
