export default class Color {
    public original;

    public r;
    public g;
    public b;
    public a;
    public hue;
    public saturation;
    public value;
    public lightness;
    public format;
    
    constructor(color?) {
        if(color instanceof Color === true) {
            this.copy(color);
            return this;
        }

        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.a = 1;
        this.hue = 100;
        this.saturation = 100;
        this.value = 100;
        this.lightness = 100;
        this.format = 'HSV';
    }

    // used to hydrate serialized data
    load(obj) {
        this.r = obj.r;
        this.g = obj.g;
        this.b = obj.b;
        this.a = obj.a;
        this.hue = obj.hue;
        this.saturation = obj.saturation;
        this.value = obj.value;
        this.format = '' + obj.format;
        this.lightness = obj.lightness;

        this.original = new Color(this);
    }

    copy(obj) {
        if(obj instanceof Color !== true) {
            console.log('Typeof parameter not Color');
            return;
        }
    
        this.r = obj.r;
        this.g = obj.g;
        this.b = obj.b;
        this.a = obj.a;
        this.hue = obj.hue;
        this.saturation = obj.saturation;
        this.value = obj.value;
        this.format = '' + obj.format;
        this.lightness = obj.lightness;
        return this;
    }

    setFormat = function setFormat(format) {
        if (format === 'HSV')
            this.format = 'HSV';
        if (format === 'HSL')
            this.format = 'HSL';
    }
    
    /*========== Methods to set Color Properties ==========*/
    
    isValidRGBValue(value) {
        return (typeof(value) === 'number' && isNaN(value) === false &&
            value >= 0 && value <= 255);
    }
    
    setRGBA(red, green, blue, alpha = 1) {
        if (this.isValidRGBValue(red) === false ||
            this.isValidRGBValue(green) === false ||
            this.isValidRGBValue(blue) === false)
            return;
    
            this.r = red | 0;
            this.g = green | 0;
            this.b = blue | 0;
    
        if (this.isValidRGBValue(alpha) === true)
            this.a = alpha | 0;
    }
    
    setByName(name, value) {
        if (name === 'r' || name === 'g' || name === 'b') {
            if(this.isValidRGBValue(value) === false)
                return;
    
            this[name] = value;
            this.updateHSX();
        }
    }
    
    setHSV(hue, saturation, value) {
        this.hue = hue;
        this.saturation = saturation;
        this.value = value;
        this.HSVtoRGB();
    }
    
    setHSL(hue, saturation, lightness) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.HSLtoRGB();
    }
    
    setHue(value) {
        if (typeof(value) !== 'number' || isNaN(value) === true ||
            value < 0 || value > 359)
            return;
        this.hue = value;
        this.updateRGB();
    }
    
    setSaturation(value) {
        if (typeof(value) !== 'number' || isNaN(value) === true ||
            value < 0 || value > 100)
            return;
        this.saturation = value;
        this.updateRGB();
    }
    
    setValue(value) {
        if (typeof(value) !== 'number' || isNaN(value) === true ||
            value < 0 || value > 100)
            return;
        this.value = value;
        this.HSVtoRGB();
    }
    
    setLightness(value) {
        if (typeof(value) !== 'number' || isNaN(value) === true ||
            value < 0 || value > 100)
            return;
        this.lightness = value;
        this.HSLtoRGB();
    }
    
    setHexa(value) {
        var valid  = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)/i.test(value);
    
        if (valid !== true)
            return;
    
        if (value[0] === '#')
            value = value.slice(1, value.length);
    
        if (value.length === 3)
            value = value.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i,'$1$1$2$2$3$3');
    
        this.r = parseInt(value.substr(0, 2), 16);
        this.g = parseInt(value.substr(2, 2), 16);
        this.b = parseInt(value.substr(4, 2), 16);
    
        this.a = 1;
        this.RGBtoHSV();
    }
    
    /*========== Conversion Methods ==========*/
    
    convertToHSL() {
        if (this.format === 'HSL')
            return;
    
        this.setFormat('HSL');
        this.RGBtoHSL();
    }
    
    convertToHSV() {
        if (this.format === 'HSV')
            return;
    
        this.setFormat('HSV');
        this.RGBtoHSV();
    }
    
    /*========== Update Methods ==========*/
    
    updateRGB() {
        if (this.format === 'HSV') {
            this.HSVtoRGB();
            return;
        }
    
        if (this.format === 'HSL') {
            this.HSLtoRGB();
            return;
        }
    }
    
    updateHSX() {
        if (this.format === 'HSV') {
            this.RGBtoHSV();
            return;
        }
    
        if (this.format === 'HSL') {
            this.RGBtoHSL();
            return;
        }
    }
    
    HSVtoRGB() {
        var sat = this.saturation / 100;
        var value = this.value / 100;
        var C = sat * value;
        var H = this.hue / 60;
        var X = C * (1 - Math.abs(H % 2 - 1));
        var m = value - C;
        var precision = 255;
    
        C = (C + m) * precision | 0;
        X = (X + m) * precision | 0;
        m = m * precision | 0;
    
        if (H >= 0 && H < 1) {	this.setRGBA(C, X, m);	return; }
        if (H >= 1 && H < 2) {	this.setRGBA(X, C, m);	return; }
        if (H >= 2 && H < 3) {	this.setRGBA(m, C, X);	return; }
        if (H >= 3 && H < 4) {	this.setRGBA(m, X, C);	return; }
        if (H >= 4 && H < 5) {	this.setRGBA(X, m, C);	return; }
        if (H >= 5 && H < 6) {	this.setRGBA(C, m, X);	return; }
    }

    HSLtoRGB() {
        var sat = this.saturation / 100;
        var light = this.lightness / 100;
        var C = sat * (1 - Math.abs(2 * light - 1));
        var H = this.hue / 60;
        var X = C * (1 - Math.abs(H % 2 - 1));
        var m = light - C/2;
        var precision = 255;
    
        C = (C + m) * precision | 0;
        X = (X + m) * precision | 0;
        m = m * precision | 0;
    
        if (H >= 0 && H < 1) {	this.setRGBA(C, X, m);	return; }
        if (H >= 1 && H < 2) {	this.setRGBA(X, C, m);	return; }
        if (H >= 2 && H < 3) {	this.setRGBA(m, C, X);	return; }
        if (H >= 3 && H < 4) {	this.setRGBA(m, X, C);	return; }
        if (H >= 4 && H < 5) {	this.setRGBA(X, m, C);	return; }
        if (H >= 5 && H < 6) {	this.setRGBA(C, m, X);	return; }
    }
    
    RGBtoHSV() {
        var red		= this.r / 255;
        var green	= this.g / 255;
        var blue	= this.b / 255;
    
        var cmax = Math.max(red, green, blue);
        var cmin = Math.min(red, green, blue);
        var delta = cmax - cmin;
        var hue = 0;
        var saturation = 0;
    
        if (delta) {
            if (cmax === red ) { hue = ((green - blue) / delta); }
            if (cmax === green ) { hue = 2 + (blue - red) / delta; }
            if (cmax === blue ) { hue = 4 + (red - green) / delta; }
            if (cmax) saturation = delta / cmax;
        }
    
        this.hue = 60 * hue | 0;
        if (this.hue < 0) this.hue += 360;
        this.saturation = (saturation * 100) | 0;
        this.value = (cmax * 100) | 0;
    }
    
    RGBtoHSL() {
        var red		= this.r / 255;
        var green	= this.g / 255;
        var blue	= this.b / 255;
    
        var cmax = Math.max(red, green, blue);
        var cmin = Math.min(red, green, blue);
        var delta = cmax - cmin;
        var hue = 0;
        var saturation = 0;
        var lightness = (cmax + cmin) / 2;
        var X = (1 - Math.abs(2 * lightness - 1));
    
        if (delta) {
            if (cmax === red ) { hue = ((green - blue) / delta); }
            if (cmax === green ) { hue = 2 + (blue - red) / delta; }
            if (cmax === blue ) { hue = 4 + (red - green) / delta; }
            if (cmax) saturation = delta / X;
        }
    
        this.hue = 60 * hue | 0;
        if (this.hue < 0) this.hue += 360;
        this.saturation = (saturation * 100) | 0;
        this.lightness = (lightness * 100) | 0;
    }
    
    /*========== Get Methods ==========*/
    
    getHexa() {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        
        if (this.r < 16) r = '0' + r;
        if (this.g < 16) g = '0' + g;
        if (this.b < 16) b = '0' + b;
        var value = '#' + r + g + b;
        return value.toUpperCase();
    }
    
    getRGBA() {
        var rgb = '(' + this.r + ', ' + this.g + ', ' + this.b;
        var a = '';
        var v = '';
        var x = parseFloat(this.a);
        if (x !== 1) {
            a = 'a';
            v = ', ' + x;
        }
    
        var value = 'rgb' + a + rgb + v + ')';
        return value;
    }
    
    getHSLA() {
        if (this.format === 'HSV') {
            var color = new Color(this);
            color.setFormat('HSL');
            color.updateHSX();
            return color.getHSLA();
        }
    
        var a = '';
        var v = '';
        var hsl = '(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness +'%';
        var x = parseFloat(this.a);
        if (x !== 1) {
            a = 'a';
            v = ', ' + x;
        }
    
        var value = 'hsl' + a + hsl + v + ')';
        return value;
    }
    
    getColor = function getColor() {
        if ( (this.a | 0) === 1)
            return this.getHexa();
        return this.getRGBA();
    }
}