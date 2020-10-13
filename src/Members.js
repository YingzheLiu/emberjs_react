import React, { useEffect, useState } from "react";
import MemberProfileModal from "./MemberProfileModal";
import MemberReposModal from "./MemberReposModal";
import { fetchData } from "./fetchData";
import { fetchMembers, removeMember, saveMember } from "./api";
import AsyncButton from "./AsyncButton";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState();
  const [follows, setFollows] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followById, setFollowById] = useState({});
  const [isMemberProfileShown, setIsMemberProfileShown] = useState(false);
  const [isMemberReposShown, setIsMemberReposShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData("https://api.github.com/orgs/emberjs/members").then((members) => {
      setMembers(members);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchMembers()
      .then((follows) => {
        console.log(follows);
        setFollows(follows);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // var followById = {};
  // members.forEach((member) => {
  //   follows.forEach((follow) => {
  //     if (member.id === follow.member) {
  //       followById[member.id] = true;
  //     }
  //   });
  //   if (followById[member.id] === undefined) {
  //     followById[member.id] = false;
  //   }
  // });
  function showMemberProfile(member) {
    setIsMemberProfileShown(true);
    setMember(member);
  }
  function hideMemberProfile() {
    setIsMemberProfileShown(false);
  }
  function showMemberRepo(member) {
    setIsMemberReposShown(true);
    setMember(member);
  }
  function hideMemberRepo() {
    setIsMemberReposShown(false);
  }
  function unfollowMember(member) {
    console.log(member.id);
    removeMember(member.id).then(() => {
      const filteredMembers = follows.filter((follow) => {
        return follow.id !== member.id;
      });
      setFollows(filteredMembers);
    });
  }
  function followMember(member) {
    console.log(member.id);
    saveMember({
      id: member.id,
      login: member.login,
    }).then((newMember) => {
      setFollows(follows.concat(newMember));
    });
    // removeMembers(id).then(() => {
    //   const filteredMembers = follows.filter((follow) => {
    //     return follow.id !== id;
    //   });
    //   setFollows(filteredMembers);
    // });
  }

  return (
    <div className="container mt-3">
      <div className="row mt-3">
        <div className="col">
          <h3>Emberjs Memebrs</h3>
          <ul className="list-group mt-3 ml-5 mr-5">
            {members.map((member, index) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={member.id}
                >
                  <div className="col-1">
                    <input
                      type="image"
                      src={member.avatar_url}
                      alt={member.login}
                      width="100"
                      onClick={() => showMemberProfile(member)}
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <AsyncButton
                        label={member.login}
                        className="btn btn-link"
                        onClick={() => showMemberProfile(member)}
                      />
                    </div>
                    <div className="row">
                      <AsyncButton
                        label={"Repo(s)"}
                        className="btn btn-link"
                        onClick={() => showMemberRepo(member)}
                      />
                    </div>
                  </div>
                  {follows.find((follow) => {
                    return follow.id === member.id;
                  }) ? (
                    <div className="col-2">
                      <AsyncButton
                        label={"Unfollow"}
                        className={"btn btn-danger"}
                        onClick={() => unfollowMember(member)}
                      />
                    </div>
                  ) : (
                    <div className="col-2">
                      <AsyncButton
                        label={"Follow"}
                        className={"btn btn-success"}
                        onClick={() => followMember(member)}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {isMemberProfileShown && (
            <MemberProfileModal onClose={hideMemberProfile} member={member} />
          )}
          {isMemberReposShown && (
            <MemberReposModal onClose={hideMemberRepo} member={member} />
          )}
        </div>
      </div>
    </div>
  );
}
