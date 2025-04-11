import init, { greet } from '../pkg/igl_quant.js';

async function run() {
    const canvas = document.getElementById('gpuCanvas');
    const statusEl = document.getElementById('status');
    
    try {
        // 1. Инициализация WASM
        await init();
        statusEl.textContent = "WASM: " + greet();
        console.log(greet());

        // 2. Проверка WebGPU
        if (!navigator.gpu) {
            throw new Error("WebGPU не поддерживается");
        }
        
        const adapter = await navigator.gpu.requestAdapter();
        const device = await adapter.requestDevice();
        const context = canvas.getContext('webgpu');
        
        // 3. Конфигурация WebGPU (исправлено!)
        const format = navigator.gpu.getPreferredCanvasFormat();
        context.configure({
            device: device,
            format: format,
            alphaMode: "opaque"
        });

        // 4. Шейдеры (упрощённые и проверенные)
        const shaderModule = device.createShaderModule({
            code: `
                @vertex fn vs_main(
                    @builtin(vertex_index) vertex_index: u32
                ) -> @builtin(position) vec4f {
                    const pos = array(
                        vec2f(0.0, 0.5),  // верх
                        vec2f(-0.5, -0.5), // лево
                        vec2f(0.5, -0.5)   // право
                    );
                    return vec4f(pos[vertex_index], 0.0, 1.0);
                }
                
                @fragment fn fs_main() -> @location(0) vec4f {
                    return vec4f(1.0, 0.0, 0.0, 1.0); // красный
                }
            `
        });

        // 5. Пайплайн рендеринга (исправлено!)
        const pipeline = device.createRenderPipeline({
            layout: 'auto',
            vertex: {
                module: shaderModule,
                entryPoint: "vs_main", // должно совпадать с именем в шейдере
                buffers: [] // пустой массив, так как вершины генерируются в шейдере
            },
            fragment: {
                module: shaderModule,
                entryPoint: "fs_main", // должно совпадать с именем в шейдере
                targets: [{ format }]
            },
            primitive: {
                topology: 'triangle-list' // явно указываем тип примитива
            }
        });

        // 6. Функция рендеринга (исправлено!)
        function render() {
            const encoder = device.createCommandEncoder();
            const textureView = context.getCurrentTexture().createView();
            
            const renderPass = encoder.beginRenderPass({
                colorAttachments: [{
                    view: textureView,
                    clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1.0 }, // серый фон
                    loadOp: 'clear',
                    storeOp: 'store'
                }]
            });
            
            renderPass.setPipeline(pipeline);
            renderPass.draw(3); // рисуем 3 вершины
            renderPass.end();
            
            device.queue.submit([encoder.finish()]);
            requestAnimationFrame(render); // важный вызов!
        }

        statusEl.textContent += " | Рендеринг: Активен";
        render(); // запускаем рендер-цикл
        
    } catch (e) {
        statusEl.style.color = "red";
        statusEl.textContent = "Ошибка: " + e.message;
        console.error("Детали ошибки:", e);
    }
}

run();