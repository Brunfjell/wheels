import useAuthStore from "../models/store/authStore";

export const canAccess = (module) => {
  const hasAccess = useAuthStore.getState().hasAccess;
  return hasAccess(module);
};

export const isRole = (role) => {
  console.log(role)
  return useAuthStore.getState().role === role;

};
