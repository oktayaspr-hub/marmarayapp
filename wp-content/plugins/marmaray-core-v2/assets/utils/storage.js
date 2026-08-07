const FAVORITES_KEY = 'marmaray_favorites';

/**
 * Get all favorite routes from localStorage
 * @returns {Array<{stationId: number, direction: string}>}
 */
export const getFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading favorites from localStorage', e);
    return [];
  }
};

/**
 * Add a new favorite route to localStorage
 * @param {number} stationId 
 * @param {string} direction 
 * @returns {boolean} true if added, false if already exists
 */
export const addFavorite = (stationId, direction) => {
  const favorites = getFavorites();
  
  // Check for duplicates
  const exists = favorites.some(fav => fav.stationId === stationId && fav.direction === direction);
  if (exists) {
    return false; // Already exists
  }

  favorites.push({ stationId, direction, id: Date.now() });
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (e) {
    console.error('Error saving favorite to localStorage', e);
    return false;
  }
};

/**
 * Remove a favorite route
 * @param {number} stationId 
 * @param {string} direction 
 */
export const removeFavorite = (stationId, direction) => {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => !(fav.stationId === stationId && fav.direction === direction));
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Error removing favorite from localStorage', e);
  }
};

/**
 * Check if a specific route is in favorites
 */
export const isFavorite = (stationId, direction) => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.stationId === stationId && fav.direction === direction);
};
