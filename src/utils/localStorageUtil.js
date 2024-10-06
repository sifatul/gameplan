const APP_VERSION = '1.2.3'; // Update this version as needed

const localStorageUtil = {

  // Save a key-value pair to localStorage
  setItem: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  },

  // Retrieve an item by key from localStorage
  getItem: function (key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Failed to retrieve from localStorage', e);
      return null;
    }
  },

  // Remove a specific item by key from localStorage
  removeItem: function (key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove from localStorage', e);
    }
  },

  // Clear all localStorage data
  clearAll: function () {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  },

  // Check if a new version of the app has been loaded, based on a stored version
  isNewVersion: function () {
    const storedVersion = this.getItem('app_version');
    if (storedVersion !== APP_VERSION) {
      this.setItem('app_version', APP_VERSION);
      return true; // New version detected
    }
    return false; // No new version
  },

  // Clear storage if a new version is detected
  clearIfNewVersion: function () {
    if (this.isNewVersion()) {
      this.clearAll();
      console.log('New version detected. Cleared all local storage.');
    }
  }
};

export default localStorageUtil;
