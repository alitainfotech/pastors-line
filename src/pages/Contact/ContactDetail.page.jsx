import React from "react";

const ContactDetailPage = ({ selectedContact }) => {
    return (
        <div>
            {selectedContact && (
                <div>
                    <p>ID: {selectedContact.id}</p>
                    <p>First Name: {selectedContact.first_name || 'N/A'}</p>
                    <p>Last Name: {selectedContact.last_name || 'N/A'}</p>
                    <p>Email: {selectedContact.email || 'N/A'}</p>
                    <p>Phone Number: {selectedContact.phone_number || 'N/A'}</p>
                    <p>Country: {selectedContact.country.iso || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};


export default ContactDetailPage;
