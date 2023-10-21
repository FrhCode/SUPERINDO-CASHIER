import Page from "@/type/page";
import Paginate from "@/type/paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useTablePagination(page: Page<any>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query: Paginate = {
    page: searchParams.get("page") ?? "0",
    size: searchParams.get("size") ?? "10",
    query: searchParams.get("query") ?? "",
    sortBy: searchParams.get("sortBy") ?? "",
    sortDirection:
      ((searchParams.get("sortDirection") as "ASC") || "DESC") ?? "ASC",
  };

  const getCanPreviousPage = () => (query.page != "0" ? true : false);
  const getCanNextPage = () => parseInt(query.page) < page.totalPages - 1;

  const getLastPageIndexNumber = () => page.totalPages - 1;

  const getCurrentPageIndex = () => parseInt(query.page) + 1;
  const getCurrentLastPageIndex = () => page.totalPages;

  const nextPage = () => {
    const newQuery: Paginate = {
      ...query,
      page: `${parseInt(query.page) + 1}`,
    };
    router.push(`${pathname}?${new URLSearchParams(newQuery)}`);
  };

  const previousPage = () => {
    const newQuery: Paginate = {
      ...query,
      page: `${parseInt(query.page) - 1}`,
    };
    router.push(`${pathname}?${new URLSearchParams(newQuery)}`);
  };

  const setPageIndex = (index: number) => {
    const newQuery: Paginate = {
      ...query,
      page: `${index}`,
    };
    router.push(`${pathname}?${new URLSearchParams(newQuery)}`);
  };

  return {
    getCanNextPage,
    getCanPreviousPage,
    previousPage,
    nextPage,
    setPageIndex,
    getLastPageIndexNumber,
    getCurrentPageIndex,
    getCurrentLastPageIndex,
  };
}
