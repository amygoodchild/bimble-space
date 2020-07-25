// Adapted by Louise Lessel - 2019
// from
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
// https://thebookofshaders.com/02/


/*
Example:
 Color the entire background blue
*/

// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float u_time;
uniform float u_mouseX;
uniform float u_mouseY;


void main() {
    vec2 uv = vTexCoord;

    float mouseX = u_mouseX/1000.0;

    // the texture is loaded upside down and backwards by default so lets flip it
    uv.y = 1.0 - uv.y;

    vec4 tex = texture2D(tex0, uv);
    vec3 reColor = vec3(100,tex.g,tex.b);

    if (tex.r > 0.5){
      vec3 reColor = vec3(100,0,0);
    }

    reColor = tex.r > 0.5 ? vec3(abs(cos(u_time)),tex.b,abs(sin(u_time))) : vec3(tex.g,abs(cos(u_time)),abs(cos(u_time)));

    /*float gray = (tex.r + tex.g + tex.b) / 3.0;

    float res = 20.0;
    float scl = res / (10.0);

    float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
    float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
    float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
    vec3 thresh = vec3(threshR, threshG, threshB);*/

    // render the output
    gl_FragColor = vec4(reColor, 1.0);
}
