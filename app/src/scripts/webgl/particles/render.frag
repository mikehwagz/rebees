precision highp float;

uniform float alpha; // ms({ value: 0.0, range: [0, 1], step: 0.001 })

void main() {
  vec3 crimson = vec3(101, 45, 48) / vec3(255);
  vec4 color = vec4(vec3(crimson), alpha);
  gl_FragColor = color;
}