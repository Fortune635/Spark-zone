// services/apiService.ts

const API_BASE_URL = ''; // Assumes the frontend is served by the backend or proxied to the same origin

// --- RESTful API Calls ---

export const getWorlds = async () => {
  const res = await fetch(`${API_BASE_URL}/api/worlds`, {
    headers: { 'X-User-ID': '1' } // Simulate authentication
  });
  if (!res.ok) throw new Error('Failed to fetch worlds');
  return res.json();
};

export const createWorld = async (worldData: Omit<World, 'id'>) => {
  const res = await fetch(`${API_BASE_URL}/api/worlds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': '1' // Simulate authentication
    },
    body: JSON.stringify(worldData),
  });
  if (!res.ok) throw new Error('Failed to create world');
  return res.json();
};

// ... other RESTful functions (getCharacters, createStory, etc.)

// --- Generative AI API Calls (Proxied through Backend) ---

interface WorldDetailsRequest {
    theme: string;
}

interface WorldDetailsResponse {
    name: string;
    description: string;
    lore: string[];
}

export const generateWorldDetailsFromAPI = async (theme: string): Promise<WorldDetailsResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/generate/world-details`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme }),
  });
  if (!res.ok) throw new Error('Failed to generate world details from AI');
  return res.json();
};

export const generateWorldImageFromAPI = async (name: string, description: string) => {
  const res = await fetch(`${API_BASE_URL}/api/generate/world-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error('Failed to generate world image from AI');
  const data = await res.json();
  return data.imageBase64 as string;
};

// ... other generate functions
