import React, { useRef, useState } from "react";
import { connect } from 'react-redux';
import ModalComponent from "../../components/Modal/Modal.component";
import ContactListPage from '../Contact/ContactList.page.jsx'
import _ from 'lodash';
import { Link } from "react-router-dom";
import { getContactList } from "../../redux/contact/contactsActions";

const ModalPage = ({ id, title, getContactList, setModalTitle }) => {
  const [isUsDataLoading, setLoading] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [page, setPage] = useState(1);
  const searchStringRef = useRef('');

  const handleUsContactsClick = async () => {
    try {
      setLoading(true);
      await getContactList({ search: searchStringRef.current.value, page, countryId: 226 });
    } finally {
      setLoading(false);
    }
  };

  const handleAllContactsClick = async () => {
    setModalTitle = () => ({ id: 'modalA', title: 'Modal A' })
    try {
      setLoading(true);
      await getContactList({ search: searchStringRef.current.value, page });
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = _.debounce(async (search) => {
    try {
      setLoading(true);
      await getContactList({ search, page });
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearch = () => {
    const searchString = searchStringRef.current.value;
    debouncedSearch(searchString);
  };

  const handleScrollReachBottom = async () => {
    try {
      setLoading(true);
      await getContactList({ search: searchStringRef.current.value, page: page + 1 });
      setPage(prevPage => prevPage + 1);
    } finally {
      setLoading(false);
    }
  };

  const body = (
    <>
      {isUsDataLoading !== null ? (
        <div className="form-group">
          <input
            type="search"
            ref={searchStringRef}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e.target.value);
              }
            }}
            className="form-control text-left"
            placeholder="Search..."
          />
        </div>
      ) : ''}

      {isUsDataLoading ? (
        <div>Loading...</div>
      ) : (
        isUsDataLoading === null ? (
          <div className="text-center">
            <Link to="/all-contact">
              <button
                className="btn m-1"
                style={{ backgroundColor: "#46139f", color: "white" }}
                onClick={handleAllContactsClick}
              >
                All Contact
              </button>
            </Link>
            <Link to="/us-contact">
              <button
                className="btn m-1"
                style={{ backgroundColor: "#ff7f50", color: "white" }}
                onClick={handleUsContactsClick}
              >
                US Contact
              </button>
            </Link>
            <Link to="">
              <button
                className="btn m-1"
                data-dismiss="modal"
                style={{ backgroundColor: "#fff", border: "1px solid #46139f" }}
              >
                Close
              </button>
            </Link>
          </div>
        ) : (
          <ContactListPage onlyEven={onlyEven} onScrollReachBottom={handleScrollReachBottom} />
        )
      )}
    </>
  );

  const footer = (
    <div className="w-100 form-check">
      <input type="checkbox" checked={onlyEven} onChange={(e) => setOnlyEven(e.target.checked)} className="form-check-input" id="onlyEvenCheckbox" />
      <label className="form-check-label" htmlFor="onlyEvenCheckbox">Only even</label>
    </div>
  );

  return (
    <ModalComponent id={id} title={title} body={body} footer={footer} />
  );
};

export default connect(null, { getContactList })(ModalPage);
