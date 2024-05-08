import { useAppSelector } from "@application/store";
import { ApiAuthorGetPageGetRequest, AuthorAddDTO, AuthorApi, AuthorUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getAuthorsQueryKey = "getAuthorsQuery";
const getAuthorQueryKey = "getAuthorQuery";
const addAuthorMutationKey = "addAuthorMutation";
const deleteAuthorMutationKey = "deleteAuthorMutation";
const updateAuthorMutationKey = "updateAuthorMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the Author API.
 */
export const useAuthorApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getAuthors = (page: ApiAuthorGetPageGetRequest) => new AuthorApi(config).apiAuthorGetPageGet(page); // Use the generated client code and adapt it.
    const getAuthor = (id: string) => new AuthorApi(config).apiAuthorGetByIdIdGet({ id });
    const addAuthor = (Author: AuthorAddDTO) => new AuthorApi(config).apiAuthorAddPost({ authorAddDTO: Author });
    const deleteAuthor = (id: string) => new AuthorApi(config).apiAuthorDeleteIdDelete({ id });
    const updateAuthor = (Author: AuthorUpdateDTO) => new AuthorApi(config).apiAuthorUpdatePut({ authorUpdateDTO: Author });

    return {
        getAuthors: { // Return the query object.
            key: getAuthorsQueryKey, // Add the key to identify the query.
            query: getAuthors // Add the query callback.
        },
        getAuthor: {
            key: getAuthorQueryKey,
            query: getAuthor
        },
        addAuthor: { // Return the mutation object.
            key: addAuthorMutationKey, // Add the key to identify the mutation.
            mutation: addAuthor // Add the mutation callback.
        },
        deleteAuthor: {
            key: deleteAuthorMutationKey,
            mutation: deleteAuthor
        },
        updateAuthor: {
            key: updateAuthorMutationKey,
            mutation: updateAuthor
        }
    }
}