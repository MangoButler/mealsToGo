// export const API_URL = "http://192.168.241.1:3000/api/places";

//Dev

export const BASE_URL = "http://10.0.2.2:3000/api/";

//Production

// export const BASE_URL = "https://cans-and-go-backend.vercel.app/api/";

export const PLACES_URL = BASE_URL + "places";

export const SEARCH_URL = BASE_URL + "search";

export const USER_URL = BASE_URL + "user";

export const HANGOUT_URL = BASE_URL + "hangouts";

export const ACTIVE_HANGOUT_URL = HANGOUT_URL + "/active-users";

export const REVIEW_URL = BASE_URL + "reviews";

export const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/dg5kd3rfa/image/upload";
export const UPLOAD_PRESET = "can_and_go";
export const PROFILE_UPLOAD_PRESET = "can_and_go_profile";
export const REVIEW_UPLOAD_PRESET = "can_and_go_review";

export const USER_STORAGE_KEY = "@authenticated_user";

export const LAST_SYNC_KEY = "@last_profile_sync";
