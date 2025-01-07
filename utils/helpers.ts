// Format price
export const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  // API Response Handler
  export const handleApiResponse = (response: any) => {
    if (response?.status === 200) {
      return response.data;
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  };
  