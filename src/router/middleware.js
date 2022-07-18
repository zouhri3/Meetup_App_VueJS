export default (to, from, next) => {
  localStorage.getItem("user") ? next() : next("/login");
};
