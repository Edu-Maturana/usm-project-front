export const saveUserData = async (name, address) => {
  console.log("saveUserData", name, address);
  const data = {
    name,
    address,
  };
  localStorage.setItem("user", JSON.stringify(data));
};

export const getUserData = () => {
  const data = localStorage.getItem("user");
  return JSON.parse(data);
};
