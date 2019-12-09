precision highp float;

uniform sampler2D textureA;
uniform sampler2D textureB;
uniform sampler2D textureC;
uniform float cityTransition; // ms({ value: 0.0, range: [0, 1.0], step: 0.001 })
uniform float planeTransition; // ms({ value: 0.0, range: [0, 1.0], step: 0.001 })

varying vec2 vUv;

void main() {
    vec3 a = texture2D(textureA, vUv).xyz;
    vec3 b = texture2D(textureB, vUv).xyz;
    vec3 c = texture2D(textureC, vUv).xyz;

    vec3 AtoB = mix(a, b, cityTransition);
    vec3 pos = mix(AtoB, c, planeTransition);

    gl_FragColor = vec4(pos, 1.0);
}