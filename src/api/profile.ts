import api from ".";

const profileService = {
  getMe: async () => await api.get("/profile/me"),
};

export default profileService;