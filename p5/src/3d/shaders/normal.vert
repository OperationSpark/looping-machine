attribute vec3 position;
attribute vec3 normal;

uniform mat4 modelviewMatrix;
uniform mat4 transformMatrix;
uniform mat4 normalMatrix;
uniform float uResolution;

varying vec3 vertexNormal;

void main(void) {
  vec3 zeroToOne = position / uResolution;
  vec4 positionVec4 = vec4(zeroToOne, 1.);
  gl_Position = transformMatrix * modelviewMatrix * positionVec4;
  vertexNormal = vec3( normalMatrix * vec4( normal, 1.0 ) );
}