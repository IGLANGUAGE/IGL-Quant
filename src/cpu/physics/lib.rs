use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PhysicsSimulator;

#[wasm_bindgen]
impl PhysicsSimulator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self
    }
}
