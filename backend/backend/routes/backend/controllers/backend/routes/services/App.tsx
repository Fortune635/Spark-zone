// App.tsx (Refactored Snippet)
import React, { useState, useEffect } from 'react';
// import * as mockData from './mockData'; // REMOVE THIS
import * as apiService from './services/apiService';
import { World, Character, Post } from './types'; // Assuming types.ts defines these

function App() {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Initial Data ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedWorlds, fetchedCharacters, fetchedPosts] = await Promise.all([
          apiService.getWorlds(),
          // apiService.getCharacters(), // Assuming you create these API calls
          // apiService.getFeedPosts()
        ]);
        setWorlds(fetchedWorlds);
        // setCharacters(fetchedCharacters);
        // setFeedPosts(fetchedPosts);
      } catch (err) {
        console.error('Initial data fetch failed:', err);
        setError('Failed to load initial application data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Updated Handler Function ---
  const handleCreateNewWorld = async (newWorldData: Omit<World, 'id'>) => {
    try {
      // Show loading/disable button in the UI component calling this
      const createdWorld = await apiService.createWorld(newWorldData);
      // Update state with the server response
      setWorlds(prev => [...prev, createdWorld]);
      return createdWorld;
    } catch (e) {
      // Handle error in the UI component
      console.error('Failed to create world:', e);
      throw e;
    }
  };

  // --- Example AI Generation Logic (inside a component like WorldEditView.tsx) ---
  const handleGenerateWorldDetails = async (theme: string) => {
    const [generating, setGenerating] = useState(false);
    const [genError, setGenError] = useState<string | null>(null);

    setGenerating(true);
    setGenError(null);
    try {
      const details = await apiService.generateWorldDetailsFromAPI(theme);
      // Use details to update the local form state (e.g., setFormName(details.name))
      return details;
    } catch (e) {
      setGenError('AI generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div>Loading Spark Zone Data... [attachment_0](attachment)</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // ... rest of your App component
  );
}
