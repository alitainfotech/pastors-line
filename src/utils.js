export const transformContactData = (newData, existingData) => {
    let data = { ...existingData }
    data.contacts.contacts.contacts_ids.push(...newData.contacts_ids)
    for (const contactId in newData.contacts) {
        if (!data.contacts.contacts.contacts[contactId]) {
            data.contacts.contacts.contacts[contactId] = newData.contacts[contactId];
        }
    }
    return { ...data.contacts.contacts };
};
