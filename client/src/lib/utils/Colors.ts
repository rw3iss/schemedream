import Color from '../models/Color';

export function RGBColor(r, g, b) {
    var color = new Color();
    color.setRGBA(r, g, b, 1);
    return color;
}

export function RGBAColor(r, g, b, a) {
    var color = new Color();
    color.setRGBA(r, g, b, a);
    return color;
}

export function HSVColor(h, s, v) {
    var color = new Color();
    color.setHSV(h, s, v);
    return color;
}

export function HSVAColor(h, s, v, a) {
    var color = new Color();
    color.setHSV(h, s, v);
    color.a = a;
    return color;
}

export function HSLColor(h, s, l) {
    var color = new Color();
    color.setHSL(h, s, l);
    return color;
}

export function HSLAColor(h, s, l, a) {
    var color = new Color();
    color.setHSL(h, s, l);
    color.a = a;
    return color;
}
