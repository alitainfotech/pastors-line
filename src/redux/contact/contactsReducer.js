const initialState = {
    contacts: [],
    error: null,
};

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CONTACTS_SUCCESS':
            return {
                ...state,
                contacts: action.payload,
                error: null,
            };
        case 'FETCH_CONTACTS_FAILURE':
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default contactsReducer;
