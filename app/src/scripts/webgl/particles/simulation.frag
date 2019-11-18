precision highp float;

uniform sampler2D textureA;
uniform sampler2D textureB;
uniform float transition; // ms({ value: 0.0, range: [0, 1.0], step: 0.001 })

varying vec2 vUv;

void main() {
    vec3 origin = texture2D( textureA, vUv ).xyz;

    vec3 dest = texture2D( textureB, vUv ).xyz;

    vec3 pos = mix( origin, dest, transition );
    gl_FragColor = vec4( pos, 1.0 );
}