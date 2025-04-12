mod cpu;
pub use cpu::physics::*;
// src/lib.rs
// pub mod physics;          // Основной модуль физики
// pub mod quantum;          // Квантовые алгоритмы 
// pub mod rendering;        // Управление рендерингом
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet() -> String {
    "Hello from IGL-Quant!".to_string()
}
