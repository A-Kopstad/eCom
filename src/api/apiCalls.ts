
//Base url
const API_BASE_URL = 'https://v2.api.noroff.dev/online-shop';

// Function to fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    return []; 
  }
};

// Function to fetch a single product by ID
export const fetchProductById = async (productId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${productId}`);
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    const product = await response.json();
    return product; 
  } catch (error) {
    console.error(error);
    return null; 
  }
};
