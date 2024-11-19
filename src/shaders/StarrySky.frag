uniform float time;
varying vec2 vUv;
uniform vec2 resolution;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

float random(float x) {
    return fract(sin(x) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    float section_width = 0.5;
    float section_width_pixels = section_width / resolution.x;
    float section_pos = floor(vUv.x / section_width_pixels);

    float r = random(vec2(section_pos, section_pos * 0.37));
    float visibility = 0.0;
    vec3 col = vec3(1.);
    if (random(vUv / 20.0) > 0.996) {
        float r = random(vUv);
        visibility += r * sin(time * (r * 5.0) + r * 360.);
    }


    
    if(r > 0.985){
        float rY = random(uv.xy);
        float positional_offset = random(section_pos * 0.73 + r * 13.57);


        float zFactor = fract(positional_offset * 12.32412314);
        float speed = zFactor * 0.1;
        float velocity = mod(time * speed, 1.0);
 
        float stripeHeight = 0.1 * zFactor;
        float startY = positional_offset + velocity;
        float endY = startY + stripeHeight;

        visibility = step(mod(startY, 1.0), 1. - uv.y) * (1.0 - step(mod(endY,1.0), 1. - uv.y)) * zFactor;
        
        if(mod(startY,1.) > mod(endY, 1.0)){
            visibility += step(mod(startY, 1.0), 1. - uv.y);
            visibility += step(0., 1. - uv.y) * (1. - step(mod(endY,1.0), 1. - uv.y));
        }

        visibility *= rY * (0.85 * sin(time * (speed * 5.0) + 720.0 * rY) + 0.95);
    }

    float fade_speed  = 0.35;
    float fade_factor = smoothstep(0.0, 1.0, time * fade_speed - (1.0 - uv.x));

    gl_FragColor = vec4(visibility * col * fade_factor * 0.5, 0.);
}