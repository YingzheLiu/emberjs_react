export function fetchMembers() {
  return fetch("/api/members").then((response) => {
    return response.json();
  });
}
export function removeMember(id) {
  return fetch(`/api/members/${id}`, {
    method: "DELETE",
  });
}
export function saveMember(data) {
  return fetch("/api/members", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
