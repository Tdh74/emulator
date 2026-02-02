import mGBA, { type mGBAEmulator } from '@thenick775/mgba-wasm';
import { useEffect, useState } from 'react';

export const useEmulator = (canvas: HTMLCanvasElement | null) => {
  const [emulator, setEmulator] = useState<mGBAEmulator | null>(null);

  useEffect(() => {
    const initialize = async () => {
      if (canvas) {
        const Module = await mGBA({ canvas });

        const mGBAVersion =
          Module.version.projectName + ' ' + Module.version.projectVersion;
        console.log(mGBAVersion);

        await Module.FSInit();

        setEmulator(Module);
      }
    };

    initialize();
  }, [canvas]);

  return emulator;
};

