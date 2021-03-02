"use strict";
// import { registry } from "./lister";
// const syntaxes = [
//     '{elev} {udsagnsord} {famous} at {place}'
// ];
// function fillOutSyntax(syntax: string): string {
//     let newString = syntax;
//     const allFillIns = syntax.match(/(?<={)(\w+)(?=})/g);
//     allFillIns?.forEach((val: string) => {
//         const list = registry.get(val);
//         if(!list) throw new TypeError(`${val} is not a registered list of words`);
//         newString = newString.replace(`{${val}}`, list[Math.floor(Math.random() * list.length)]);
//     })
//     return newString;
// }
// for(let i = 0; i < 10; i++) {
//     console.log(fillOutSyntax(syntaxes[0]));
// }
class SportFakeNews {
    constructor() {
        this.syntaxes = [];
        this.categorys = new Map();
        this.syntaxes.push("{land} {vinder over | taber til} {land} i {sport}", "{sport} udgår nu som OL disciplin", "BREAKING: {land} fyrer {person} efter {event} med {person}", "{person} stiller op i {sport} til OL", "{person} brækker sin {kropsdel} efter {event} mod {person}");
        this.categorys.set('person', ['Cristiano Ronaldo', 'LeBron James', 'Lionel Messi', 'Neymar Jr.', 'Kevin Durant', 'Tiger Woods', 'Rafael Nadal', 'Novak Djokovic', 'Maria Sharapova']);
        this.categorys.set('sport', ['fodbold', 'tennis', 'håndbold', 'volleyball', 'golf', 'svømning', 'basketball', 'hockey', 'cykling']);
        this.categorys.set('land', ['Danmark', 'Tyskland', 'Usa', 'Sverige', 'Norge', 'Rusland', 'Kroatien', 'Syd Afrika', 'Island']);
        this.categorys.set('kropsdel', ['lillefinger', 'ben', 'arm', 'ryg', 'fod', 'storetå', 'albue']);
        this.categorys.set('event', ['stort opgør', 'hemmeligt forhold']);
    }
    generateHeadline(syntax = this.randomSyntax()) {
        let newString = this.parseSyntax(syntax);
        // Make the headline Title cased
        return this.toTitleCase(newString);
    }
    parseSyntax(syntax) {
        let newString = syntax;
        const matches = this.getArguments(syntax);
        matches === null || matches === void 0 ? void 0 : matches.forEach((val) => {
            const list = val.includes('|') ? val.split('|').map(s => s.trim()) : this.categorys.get(val);
            if (!list)
                throw new Error(`${val} er ikke en rigtig liste af ord`);
            let sentenceToReplaceWith = list[Math.floor(Math.random() * list.length)];
            if (sentenceToReplaceWith.includes('{'))
                sentenceToReplaceWith = this.parseSyntax(sentenceToReplaceWith);
            newString = newString.replace(`{${val}}`, sentenceToReplaceWith);
        });
        return newString;
    }
    randomSyntax() {
        return this.syntaxes[Math.floor(Math.random() * this.syntaxes.length)];
    }
    toTitleCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    getArguments(str) {
        const matches = [];
        const bracketStack = [];
        str.split('').forEach((char, idx) => {
            if (char == '{')
                bracketStack.push(idx);
            if (char == '}') {
                if (bracketStack.length == 1) {
                    const val = str.slice((bracketStack.pop() || 0) + 1, idx);
                    matches.push(val);
                }
                else {
                    bracketStack.pop();
                }
            }
        });
        return matches;
    }
}
window.SportFakeNews = SportFakeNews;
