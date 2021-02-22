export default class StringUtils {

    static capitalizeString(str: string, allWords: boolean = false) {
        let words = str.split(' ');
        let wordsUpper: any = [];
        words.forEach((w: string, i: number) => {
            if (i > 0 && !allWords) {
                wordsUpper.push(w);
            } else {
                wordsUpper.push(w.charAt(0).toUpperCase() + w.slice(1));
            }
        })
        return wordsUpper.join(' ');
    }

    static isValidEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
}