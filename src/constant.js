

export const BASE_URL='http://localhost:4000/api'

export const getAuthHeader = (token) => {

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  
export const wait=async(s)=>{
  await new Promise(resolve => setTimeout(resolve, s*1000));
}  