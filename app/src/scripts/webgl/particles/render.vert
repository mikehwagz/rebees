#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: curlNoise = require(glsl-curl-noise/curl)

precision highp float;
    
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform sampler2D positions; // ms({ value: null })
uniform float size; // ms({ value: 2.0, range: [0, 20], step: 0.1 })
uniform float time; // ms({ value: 0.0 })
uniform float speed; // ms({ value: 0.01, range: [0, 0.03], step: 0.000001 })
uniform float frequency; // ms({ value: 0.011, range: [0, 0.04], step: 0.00001 })
uniform float amplitude; // ms({ value: 0.5, range: [0, 20], step: 1 })
uniform vec3 mouse;
uniform float radius;

void main() {
    vec3 p = texture2D(positions, position.xy).xyz;

    float index = position.z;

    p += curlNoise(frequency * p + time * speed) * amplitude;

    vec3 m = mouse;
    m.x -= 500.0;
    m.y += 145.0;

    float dist = distance(p, m);
    if (dist < radius) {
        float norm = 1.0 - dist / radius;
        float a = amplitude * 50.0 * norm;
        p += curlNoise(frequency * p + time * speed) * a;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);

    float pointSize = (snoise2(vec2(time * 0.05, index) * 0.5) + 2.0);
    pointSize *= 0.5;
    pointSize *= size;

    gl_PointSize = pointSize;
}