/* Loads a state from localStorage if it exists. */
export function loadState(): any | undefined {
  try {
    const serializedState: string = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

/* Saves a state to the localStorage. */
export function saveState(state: any): void | any {
  try {
    const serializedState: string = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    return err;
  }
}
