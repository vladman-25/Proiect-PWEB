import { useAppSelector } from "@application/store";
import { ApiPublisherGetPageGetRequest, PublisherAddDTO, PublisherUpdateDTO, PublisherApi } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getPublishersQueryKey = "getPublishersQuery";
const getPublisherQueryKey = "getPublisherQuery";
const addPublisherMutationKey = "addPublisherMutation";
const deletePublisherMutationKey = "deletePublisherMutation";
const updatePublisherMutationKey = "updatePublisherMutation";
/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the Publisher API.
 */
export const usePublisherApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getPublishers = (page: ApiPublisherGetPageGetRequest) => new PublisherApi(config).apiPublisherGetPageGet(page); // Use the generated client code and adapt it.
    const getPublisher = (id: string) => new PublisherApi(config).apiPublisherGetByIdIdGet({ id });
    const addPublisher = (Publisher: PublisherAddDTO) => new PublisherApi(config).apiPublisherAddPost({ publisherAddDTO: Publisher });
    const deletePublisher = (id: string) => new PublisherApi(config).apiPublisherDeleteIdDelete({ id });
    const updatePublisher = (Publisher: PublisherUpdateDTO) => new PublisherApi(config).apiPublisherUpdatePut({ publisherUpdateDTO: Publisher });

    return {
        getPublishers: { // Return the query object.
            key: getPublishersQueryKey, // Add the key to identify the query.
            query: getPublishers // Add the query callback.
        },
        getPublisher: {
            key: getPublisherQueryKey,
            query: getPublisher
        },
        addPublisher: { // Return the mutation object.
            key: addPublisherMutationKey, // Add the key to identify the mutation.
            mutation: addPublisher // Add the mutation callback.
        },
        deletePublisher: {
            key: deletePublisherMutationKey,
            mutation: deletePublisher
        },
        updatePublisher: {
            key: updatePublisherMutationKey,
            mutation: updatePublisher
        }
    }
}