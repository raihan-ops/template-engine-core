import { serverApi } from '../../../services/serverApi';

export async function fetchSampleData() {
  // Example API endpoint
  return serverApi('https://jsonplaceholder.typicode.com/posts/1');
} 