// Пример compute-шейдера
@group(0) @binding(0) var<storage, read_write> particles: array<f32>;

@compute @workgroup_size(64)
fn update_particles(@builtin(global_invocation_id) id: vec3<u32>) {
    let idx = id.x;
    particles[idx] += 0.1;
}