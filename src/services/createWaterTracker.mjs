import { addSip } from "./addSip.mjs";

export function createWaterTracker(repository) {
  let current = repository.load();

  return {
    getCurrent() {
      return current;
    },

    addSip() {
      current = addSip(current);
      repository.save(current);
      return current;
    },
    reset() {
        current = { sips: 0, totalMl: 0 };
        repository.save(current);
        return current;
    },
  };
}