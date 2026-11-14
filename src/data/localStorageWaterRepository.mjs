const STORAGE_KEY = "water-tracker-state";

export function createLocalStorageWaterRepository(storage) {
  return {
    load() {
      const savedState = storage.getItem(STORAGE_KEY);

      if (savedState === null) {
        return { sips: 0, totalMl: 0 };
      }

      return JSON.parse(savedState);
    },

    save(state) {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  };
}