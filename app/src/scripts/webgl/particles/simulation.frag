precision highp float;

uniform sampler2D textureA;
uniform sampler2D textureB;
uniform sampler2D textureC;
uniform float transition; // ms({ value: 0.0, range: [0, 1.0], step: 0.001 })
uniform int transitionState; // ms({ value: 0, range: [0, 2], step: 1 })

varying vec2 vUv;

void main() {
    vec3 a = texture2D(textureA, vUv).xyz;
    vec3 b = texture2D(textureB, vUv).xyz;
    vec3 c = texture2D(textureC, vUv).xyz;

    vec3 AtoB = mix(a, b, transition);
    vec3 BtoC = mix(b, c, transition);
    vec3 AtoC = mix(a, c, transition);

    vec3 pos = AtoB;

    if (transitionState == 1) {
        pos = BtoC;
    }

    if (transitionState == 2) {
        pos = AtoC;
    }

    gl_FragColor = vec4(pos, 1.0);
}