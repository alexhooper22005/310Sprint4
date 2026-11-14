const SIP_VOLUME_ML = 16;

export function addSip(current) {
  return {
    sips: current.sips + 1,
    totalMl: current.totalMl + SIP_VOLUME_ML,
  };
}