import { useAppSelector } from "@application/store";
import { ApiAddressGetPageGetRequest, AddressAddDTO, AddressApi, AddressUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getAddresssQueryKey = "getAddresssQuery";
const getAddressQueryKey = "getAddressQuery";
const addAddressMutationKey = "addAddressMutation";
const deleteAddressMutationKey = "deleteAddressMutation";
const updateAddressMutationKey = "updateAddressMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the Address API.
 */
export const useAddressApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getAddresss = (page: ApiAddressGetPageGetRequest) => new AddressApi(config).apiAddressGetPageGet(page); // Use the generated client code and adapt it.
    const getAddress = (id: string) => new AddressApi(config).apiAddressGetByIdIdGet({ id });
    const addAddress = (Address: AddressAddDTO) => new AddressApi(config).apiAddressAddPost({ addressAddDTO: Address });
    const deleteAddress = (id: string) => new AddressApi(config).apiAddressDeleteIdDelete({ id });
    const updateAddress = (Address: AddressUpdateDTO) => new AddressApi(config).apiAddressUpdatePut({ addressUpdateDTO: Address });

    return {
        getAddresss: { // Return the query object.
            key: getAddresssQueryKey, // Add the key to identify the query.
            query: getAddresss // Add the query callback.
        },
        getAddress: {
            key: getAddressQueryKey,
            query: getAddress
        },
        addAddress: { // Return the mutation object.
            key: addAddressMutationKey, // Add the key to identify the mutation.
            mutation: addAddress // Add the mutation callback.
        },
        deleteAddress: {
            key: deleteAddressMutationKey,
            mutation: deleteAddress
        },
        updateAddress: {
            key: updateAddressMutationKey,
            mutation: updateAddress
        }
    }
}