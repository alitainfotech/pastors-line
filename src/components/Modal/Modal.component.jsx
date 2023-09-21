import React from "react";

const ModalComponent = ({ id, title, body, footer, size='lg' }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className={"modal-dialog modal-" + size}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
