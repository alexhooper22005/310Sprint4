export function countEquivalentObjects(waterMl, objectVolumeMl) {
  return waterMl / objectVolumeMl;
}

const comparisonObjects = [
  { name: "teaspoon", volumeMl: 5 },
  { name: "tablespoon", volumeMl: 15 },
  { name: "teacup", volumeMl: 150 },
  { name: "bottle", volumeMl: 500 },
  { name: "basketball", volumeMl: 7000 },
];

export function getComparisonObject(waterMl) {
  let reachedObject = null;
  

  for (const object of comparisonObjects) {
    if (waterMl >= object.volumeMl) {
      reachedObject = object;
    }
  }

  return reachedObject;
}

export function getComparisonStatus(waterMl) {
  const current = getComparisonObject(waterMl);
  const nextIndex = current
    ? comparisonObjects.indexOf(current) + 1
    : 0;
  const next = comparisonObjects[nextIndex] ?? null;

  return {
    current,
    next,
    progressPercent: next
      ? Math.round((waterMl / next.volumeMl) * 100)
      : 100,
  };
}