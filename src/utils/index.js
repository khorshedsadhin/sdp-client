import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append('image', imageData);

  const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
  const imageURL = data?.data?.display_url;

  return imageURL;
}

// save or update user in db
export const saveOrUpdateUser = async(userData) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData);

  return data;
}

// Auth header for the *public* endpoints that filter their results for a
// signed-in tutor (the tuition listings and tuition details). Those routes use
// optionalAuth server-side, so the token is a hint rather than a requirement -
// hence plain axios instead of useAxiosSecure, whose interceptor logs the user
// out on a 403/404-style rejection.
export const authHeader = (user) =>
  user?.accessToken
    ? { headers: { Authorization: `Bearer ${user.accessToken}` } }
    : {};