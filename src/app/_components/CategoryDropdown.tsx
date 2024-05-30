"use client"

import { useRouter } from "next/navigation"
import * as React from "react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { api } from "~/trpc/react"

export function DropdownMenuRadioGroupDemo({ paramCategoryId }) {
  const [position, setPosition] = React.useState(paramCategoryId || "bottom")

  const { data, isLoading, error } = api.questions.getCategorys.useQuery()

  const router = useRouter()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading categories</div>

  const handleNavigation = (categoryId) => {
    router.push(`/evaluate/${categoryId}/1`)
    setPosition(categoryId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border-none text-[#2d2323] focus:border-none" variant="outline">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {data.map((category, index) => (
            <DropdownMenuRadioItem
              key={index}
              value={category.id}
              onClick={() => handleNavigation(category.id)}
            >
              {category.name}
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="back" onClick={() => router.push('/categories')}>
            Back to all
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
