import Canvas from '../canvas';
import Customizer from './Customizer';

export default function Create() {
    return (
      <main className="mt-3 overflow-hidden relative create h-[90vh] transition-all ease-in">
        <Canvas />
        <Customizer />
      </main>
    )
  }