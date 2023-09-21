import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import ModalComponent from "../../components/Modal/Modal.component";
import ContactDetailPage from "./ContactDetail.page";
import Scrollbars from "react-custom-scrollbars";

const ContactListPage = ({ contacts, error, onlyEven, onScrollReachBottom }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactList, setContactList] = useState(contacts);
  const scrollbarsRef = useRef();

  useEffect(() => {
    let filteredContacts = {};

    contacts.contacts_ids.forEach(contactId => {
      if (!onlyEven || contactId % 2 === 0) {
        filteredContacts[contactId] = contacts.contacts[contactId];
      }
    });

    setContactList({ ...contacts, contacts: filteredContacts });
  }, [onlyEven, contacts]);

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleScroll = () => {
    const scrollbars = scrollbarsRef.current;
    const newScrollPosition = scrollbars.getValues().top;
    if (newScrollPosition === 1) {
      onScrollReachBottom();
    }
  };


  return (
    <div>
      <h6>Contact List Page</h6>
      {error && <div>Error: {error}</div>}
      {contacts?.contacts && (
        <div>
          <Scrollbars ref={scrollbarsRef}
            style={{ width: 'auto', height: 500 }}
            onScrollFrame={handleScroll}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(contactList.contacts).map(contactId => {
                  const contact = contactList.contacts[contactId];
                  return (
                    <tr key={contactId} data-toggle="modal" data-target="#contactDetailModal" onClick={() => handleRowClick(contact)}>
                      <td>{contact.id}</td>
                      <td>{contact.first_name || 'N/A'}</td>
                      <td>{contact.last_name || 'N/A'}</td>
                      <td>{contact.email || 'N/A'}</td>
                      <td>{contact.phone_number || 'N/A'}</td>
                      <td>{contact.country.iso || 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Scrollbars>

          {/* Contact Detail Modal */}
          <ModalComponent id="contactDetailModal" title="Contact Detail" size="sm" body={selectedContact && <ContactDetailPage selectedContact={selectedContact} />} />
        </div>
      )
      }
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.contacts,
    error: state.contacts.error,
  };
};

export default connect(mapStateToProps)(ContactListPage);
