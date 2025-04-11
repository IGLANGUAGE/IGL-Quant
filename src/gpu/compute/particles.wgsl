@group(0) @binding(0) var<storage, read_write> particles: array<vec2f>;
@group(0) @binding(1) var<storage, read> params: Params;

struct Params {
    delta_time: f32,
    gravity: vec2f,
};

@compute @workgroup_size(64)
fn update_particles(@builtin(global_invocation_id) id: vec3u) {
    let idx = id.x;
    particles[idx] += params.gravity * params.delta_time;
}