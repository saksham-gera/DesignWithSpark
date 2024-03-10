import { proxy } from 'valtio';

const state2 = proxy({
  intro: false,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
});

export default state2;