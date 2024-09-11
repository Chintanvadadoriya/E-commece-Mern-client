

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

export const publicStripeKey='pk_test_51Mizj9DJy5ivnUBD9seBP8FkB29z67wupiSKFf3B3oRJeZZqnfK2yssLq7twOjwGoqsYEOP4RBXRO42hcE8rKqNk00ZU1a3ELE'