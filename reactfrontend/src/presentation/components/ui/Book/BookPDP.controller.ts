import { useTableController } from "../Tables/Table.controller";
import { useBookApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Tables/Pagination.controller";
import { useState } from "react";
/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useBookPDPController = (id: string) => {
    console.log("useBookPDPController")   
    
    const { getBook: { query } } = useBookApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.

    const { data, isError, isLoading } = useQuery({
        queryKey: [id],
        queryFn: () => query(id)
    }); // Retrieve the table page from the backend via the query hook.


    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [id] }),
        [queryClient, id]); // Create a callback to try reloading the data for the table via query invalidation.

    return { // Return the controller state and actions.
        tryReload,
        Data: data?.response,
        isError,
        isLoading,
    };
}