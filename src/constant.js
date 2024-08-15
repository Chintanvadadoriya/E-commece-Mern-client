

export const BASE_URL=process.env.REACT_APP_BASE_URL

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