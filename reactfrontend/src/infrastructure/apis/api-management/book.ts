import { useAppSelector } from "@application/store";
import { ApiBookGetPageGetRequest, BookAddDTO, BookApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getBooksQueryKey = "getBooksQuery";
const getBookQueryKey = "getBookQuery";
const addBookMutationKey = "addBookMutation";
const deleteBookMutationKey = "deleteBookMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useBookApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getBooks = (page: ApiBookGetPageGetRequest) => new BookApi(config).apiBookGetPageGet(page); // Use the generated client code and adapt it.
    const getBook = (id: string) => new BookApi(config).apiBookGetByIdIdGet({ id });
    const addBook = (book: BookAddDTO) => new BookApi(config).apiBookAddPost({ bookAddDTO: book });
    const deleteBook = (id: string) => new BookApi(config).apiBookDeleteIdDelete({ id });

    return {
        getBooks: { // Return the query object.
            key: getBooksQueryKey, // Add the key to identify the query.
            query: getBooks // Add the query callback.
        },
        getBook: {
            key: getBookQueryKey,
            query: getBook
        },
        addBook: { // Return the mutation object.
            key: addBookMutationKey, // Add the key to identify the mutation.
            mutation: addBook // Add the mutation callback.
        },
        deleteBook: {
            key: deleteBookMutationKey,
            mutation: deleteBook
        }
    }
}