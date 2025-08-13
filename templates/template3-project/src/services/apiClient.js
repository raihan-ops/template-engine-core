// Client-side API utility
export async function apiClient(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // Optionally log or handle error globally
    throw error;
  }
} 