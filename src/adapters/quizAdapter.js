import Data from '../UI/components/celebrities.json';

export const fetchCelebtityDetails = async () => {
  try {
    // const response = await setTimeout(() => Data, 1000);
    return Data;
  } catch (e) {
    console.log(e);
  }
};