export default /*glsl*/ `
uniform float uValue;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

void main()
{
    vec3 newColorStart = uColorStart;
    vec3 newColorEnd = uColorEnd;

    newColorStart *= vec3(0, 0.047, 0.604);
    newColorEnd *= vec3(0.047, 0.31, 0.808);
    vec3 colorFinal = mix(newColorStart, newColorEnd, uValue);


    gl_FragColor = vec4(colorFinal, 1.0);
}
`;
