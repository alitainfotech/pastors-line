import ContactsApi from '../../api/contact.api'
import { transformContactData } from '../../utils';

export const fetchUsContactsSuccess = (data) => ({
    type: 'FETCH_CONTACTS_SUCCESS',
    payload: data,
});

export const fetchUsContactsFailure = (error) => ({
    type: 'FETCH_CONTACTS_FAILURE',
    payload: error,
});



export const getContactList = ({ search, page, countryId = null }) => async (dispatch, getState) => {
    const apiParams = {
        page: page,
        query: search,
        countryId: countryId,
    };

    try {
        const res = await ContactsApi.fetchContacts(apiParams.query, apiParams.page, apiParams.countryId);

        const existingContacts = getState();

        let updatedData;
        if (apiParams.page >= 2) {
            updatedData = transformContactData(res, existingContacts);
        } else {
            updatedData = res;
        }

        dispatch(fetchUsContactsSuccess(updatedData));
    } catch (error) {
        dispatch(fetchUsContactsFailure(error.message));
    }
};
