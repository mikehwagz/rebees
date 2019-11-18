precision highp float;

void main() {
  vec3 crimson = vec3(101, 45, 48) / vec3(255);
  vec4 color = vec4(vec3(crimson), 1.0);
  gl_FragColor = color;
}