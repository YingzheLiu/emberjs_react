import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { fetchData } from "./fetchData";

export default function MemberReposModal({ onClose, member }) {
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState();

  useEffect(() => {
    fetchData(member.repos_url)
      .then((repos) => {
        setRepos(repos);
        console.log(repos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [member.repos_url]);

  return createPortal(
    <>
      {!isLoading && (
        <div>
          <div className="modal-backdrop show"></div>
          <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{member.login}'s Repos</h5>
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
                  {repos.map((repo, index) => {
                    return (
                      <div key={repo.id}>
                        <p>
                          {index + 1}.
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {repo.name}
                          </a>
                        </p>
                        <p>Description: {repo.description}</p>
                      </div>
                    );
                  })}
                  ;
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-container")
  );
}
