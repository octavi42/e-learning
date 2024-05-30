import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "~/components/ui/pagination";

export function PaginationDemo({ questions, currentPage }) {
  const totalPages = questions.length;

  const router = useRouter();

  return (
    <Pagination className="bg-[#dbe2e2] py-3 rounded-xl">
      <PaginationContent>
        {questions.map((question, index) => (
          <PaginationItem key={index}>
            <PaginationLink
            className="hover:cursor-pointer"
            onClick={() => router.push(`${question.order}`)}
            isActive={question.order === currentPage}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
