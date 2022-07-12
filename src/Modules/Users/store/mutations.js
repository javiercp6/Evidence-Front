import jwt_decode from "jwt-decode";
// export const myAction = ( state ) => {

// }

export const getUsers = (state, users) => {
  state.users = users;
};

export const createUser = (state, users) => {
  state.users.push(users);
};

export const editUser = (state, user) => {
  console.log(user);
  const idx = state.users.map((u) => u._id).indexOf(user._id);
  console.log(idx);
  state.users[idx] = user;
};

export const deleteUser = (state, idUser) => {
  console.log(idUser);
  state.users = state.users.filter((user) => user._id !== idUser);
};
