const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

export const fetchScore = async (postcode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/score/${encodeURIComponent(postcode)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch score');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};
