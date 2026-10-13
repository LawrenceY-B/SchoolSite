/**
 * Tiny "app is ready" signal. The preloader fires it once on first load;
 * intros and page wipes wait for it so they play as the curtain lifts.
 */
let ready = false;
const listeners = new Set<() => void>();

export const isReady = () => ready;

export const markReady = () => {
  if (ready) return;
  ready = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
};

export const whenReady = (cb: () => void) => {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
