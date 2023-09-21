import axiosInstance from "./api";
const ContactAPI = {
  fetchContacts: async (query, page, countryId) => {
    try {
      const response = await axiosInstance.get("contacts.json", {
        params: {
          companyId: 560,
          query,
          page,
          countryId,
          noGroupDuplicates: 1
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
};

export default ContactAPI;
