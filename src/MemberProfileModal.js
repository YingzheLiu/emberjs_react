import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { fetchData } from "./fetchData";

export default function MemberProfileModal({ onClose, member }) {
  const [memberDetail, setMemberDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(member.url)
      .then((memberDetail) => {
        setMemberDetail(memberDetail);
        console.log(memberDetail);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [member.url]);
  return createPortal(
    <>
      {!isLoading && (
        <div>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{member.login}'s Profile</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Name: {memberDetail.name}</p>
                  <p>Company: {memberDetail.company}</p>
                  <p>Blog: {memberDetail.blog}</p>
                </div>
                <div className="modal-footer">
                  {/* <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger">
                Delete
              </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-container")
  );
}
