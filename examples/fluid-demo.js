import { greet } from '../pkg/igl_quant.js';

async function init() {
  // 1. Инициализация WASM
  await wasmInit();
  console.log(greet()); // Проверка работы WASM

  // 2. Инициализация WebGPU
  if (!navigator.gpu) {
    throw new Error("WebGPU не поддерживается!");
  }
  
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();
  console.log("WebGPU готов к работе!");
}

init().catch(console.error);