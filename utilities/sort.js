export function sortUserByName(users) {
  users.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));
  return users;
}
