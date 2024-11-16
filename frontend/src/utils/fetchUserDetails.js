import network from "./network";
import allApis from "../config";

const fetchUserDetails = async () => {
  try {
    const response = await network({
      ...allApis.userDetails,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
