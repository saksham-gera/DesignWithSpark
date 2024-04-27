import { proxy } from 'valtio';

const state = proxy({
  color: "#1B1B25", // Default color
});

export default state;