export function isVisited(id) {
  return localStorage.getItem(id) === "visited";
}

export function setVisited(id) {
  localStorage.setItem(id, "visited");
}

export function removeVisited(id) {
  localStorage.removeItem(id);
}