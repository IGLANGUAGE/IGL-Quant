mod cpu;
pub use cpu::physics::*;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet() -> String {
    "Hello from IGL-Quant!".to_string()
}
