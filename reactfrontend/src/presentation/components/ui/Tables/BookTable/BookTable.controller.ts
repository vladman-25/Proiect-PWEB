import { useTableController } from "../Table.controller";
import { useBookApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";
import { useState } from "react";
import { BookUpdateDTO } from "@infrastructure/apis/client";
/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useBookTableController = () => {
    const { getBooks: { key: queryKey, query }, deleteBook: { key: deleteBookKey, mutation: deleteBook }, 
    updateBook: { key: updateBookKey, mutation: updateBook } } = useBookApi(); // Use the API hook.
    
    const [search, setSearch] = useState("");
    
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading } = useQuery({
        queryKey: [search, page, pageSize],
        queryFn: () => query({search, page, pageSize })
    }); // Retrieve the table page from the backend via the query hook.
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteBookKey],
        mutationFn: deleteBook
    }); // Use a mutation to remove an entry.
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [search] })),
        [queryClient, deleteMutation, search]); // Create the callback to remove an entry.


    const { mutateAsync: updateMutation } = useMutation({
        mutationKey: [updateBookKey],
        mutationFn: updateBook
    }); // Use a mutation to remove an entry.
    const update = useCallback(
        (book: BookUpdateDTO) => updateMutation(book).then(() => queryClient.invalidateQueries({ queryKey: [search] })),
        [queryClient, updateMutation, search]); // Create the callback to remove an entry.
    
    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [search] }),
        [queryClient, search]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, setSearch, data?.response?.pageSize); // Adapt the pagination for the table.

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        update
    };
}