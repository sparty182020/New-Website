class CustomMath {
    static devideWithRemainder = (a, b) => [Math.floor(a / b), a % b];
    static collatz = (startingNumber = 5, maxIterations = 100) => {
        if (startingNumber <= 0) throw new SyntaxError('Starting Number must be greater than 0');
        let iterations = 0;
        let finished = false;
        let maxNumberIndex = 0;
        let maxNumber = startingNumber;
        let currentNumber = startingNumber;
        while (iterations < maxIterations) {
            currentNumber = (currentNumber % 2 == 1) ? (currentNumber * 3) + 1 : currentNumber / 2;
            if (currentNumber > maxNumber) {
                maxNumber = Math.max(maxNumber, currentNumber);
                maxNumberIndex = iterations;
            }
            iterations++;
            if (currentNumber == 4) { finished = true; break }
        }
        return { iterations, finished, maxNumberIndex, maxNumber, currentNumber };
    }
}

class Timer {
    static #timesettings = {
        locale: 'en-US',
        options: {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            weekday: "long",
            timeZone: "America/Detroit",
            timeZoneName: "longGeneric",
        }
    }
    static timestamp = v => new Intl.DateTimeFormat(this.#timesettings.locale, this.#timesettings.options).format(v)
    static elapsedTime = (timestamp) => {
        if (isNaN(timestamp)) throw TypeError("Timestamp must be a number")
        const time = {
            year: Math.floor(Math.floor(timestamp) / 1000 / 60 / 60 / 24 / 30 / 12),
            month: Math.floor(Math.floor(timestamp) / 1000 / 60 / 60 / 24 / 30) % 12,
            day: Math.floor(Math.floor(timestamp) / 1000 / 60 / 60 / 24) % 30,
            hour: Math.floor(Math.floor(timestamp) / 1000 / 60 / 60) % 24,
            minute: Math.floor(Math.floor(timestamp) / 1000 / 60) % 60,
            second: Math.floor(Math.floor(timestamp) / 1000) % 60,
            millisecond: Math.floor(timestamp) % 1000
        }
        return [time.year, time.month, time.day, time.hour, time.minute, time.second, time.millisecond]
            .map((value, index) => {
                if (value === 0) return ''
                if (value === 1) {
                    switch (index) {
                        case 0: return `${value} year`;
                        case 1: return `${value} month`;
                        case 2: return `${value} day`;
                        case 3: return `${value} hour`;
                        case 4: return `${value} minute`;
                        case 5: return `${value} second`;
                        case 6: return `${value} millisecond`;
                    }
                } else {
                    switch (index) {
                        case 0: return `${value} years`;
                        case 1: return `${value} months`;
                        case 2: return `${value} days`;
                        case 3: return `${value} hours`;
                        case 4: return `${value} minutes`;
                        case 5: return `${value} seconds`;
                        case 6: return `${value} milliseconds`;
                    }
                }
            })
            .filter(value => value !== '')
            .join(', ');
    }
    static stringToMilliseconds = (timeString) => {
        if (typeof timeString !== 'string') throw TypeError("Time String must be a string")
        const time = timeString.split(' ');
        let milliseconds = 0;
        time.forEach(value => {
            const unit = value.slice(-1);
            const amount = value.slice(0, -1);
            switch (unit) {
                case 'w':
                    milliseconds += amount * 604800000;
                    break;
                case 'd':
                    milliseconds += amount * 86400000;
                    break;
                case 'h':
                    milliseconds += amount * 3600000;
                    break;
                case 'm':
                    milliseconds += amount * 60000;
                    break;
                case 's':
                    milliseconds += amount * 1000;
                    break;
            }
        })
        return milliseconds;
    }
    static unixTime = (date) => (!(date instanceof Date) || !(typeof date == 'number')) ? TypeError("Date must be a Date object") : Math.round(date.getTime() / 1000)
}

class Keys {
    static keyGen = (length) => {
        if (length < 1 || isNaN(length)) throw TypeError("Length isn't valid")
        let key = 0
        while (i > 0) {
            key += (Math.round(Math.random() * 8) + 1) * Math.pow(10, i)
            i--
        }
        return key
    }
}

class Logger {
    constructor() {
        this.cmethods = []
    }
    static #defaults = { color: ["0", "0", "0", "1"], borderColor: ["0", "0", "0", "1"], background: ["0", "0", "0", "0.2"], text: "Filler Text", logType: "log" }
    static error = (msg = "") => console.error(`%cERROR%c ${msg}`, 'color:red;border:1px solid red;border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(220,0,0,0.2);padding: 0px 3px 0px 3px', '')
    static warn = (msg = "") => console.warn(`%cWARNING%c ${msg}`, 'color:darkorange;border:1px solid darkorange;border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(240,130,0,0.2);padding: 0px 3px 0px 3px', '')
    static success = (msg = "") => console.log(`%cLOG%c ${msg}`, 'color:green;border:1px solid green;border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(0,220,0,0.2);padding: 0px 3px 0px 3px', '')
    static customTag = (tagData) => {
        if (typeof tagData !== "object" && tagData !== undefined) throw new SyntaxError("Invalid Data")
        tagData.color ??= this.#defaults.color
        tagData.borderColor ??= this.#defaults.borderColor
        tagData.background ??= this.#defaults.background
        tagData.text ??= this.#defaults.text
        tagData.logType ??= this.#defaults.logType
        if (typeof tagData.color !== "object" || tagData.color.length !== 4 || typeof tagData.borderColor !== "object" || tagData.borderColor.length !== 4 || typeof tagData.background !== "object" || tagData.background.length !== 4) throw new TypeError("Please enter a valid rgba array")
        const tagCSS = `color:rgba(${tagData.color.join(', ')});border:1px solid rgba(${tagData.borderColor.join(', ')});border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(${tagData.background.join(', ')});padding: 0px 3px 0px 3px;`
        console.log(`Your method:\n%cconsole.${tagData.logType}('%c${tagData.text.toUpperCase()}%c ','${tagCSS}','')`, 'font-weight:bolder;font-family:arial;')
        console.log('%cPreview: ', 'font-weight:bolder;font-family:arial;text-decoration:underline')
        new Function(`console.${tagData.logType}('%c${tagData.text.toUpperCase()}%c ','${tagCSS}','')`).call()
    }
    error = (msg = "") => cLogs.error(msg)
    warn = (msg = "") => cLogs.warn(msg)
    success = (msg = "") => cLogs.success(msg)
    makeTag = (tagData) => {
        if (typeof tagData !== "object" && tagData !== undefined) throw new SyntaxError("Invalid Data")
        tagData.color ??= this.#defaults.color
        tagData.borderColor ??= this.#defaults.borderColor
        tagData.background ??= this.#defaults.background
        tagData.text ??= this.#defaults.text
        tagData.logType ??= this.#defaults.logType
        if (
            typeof tagData.color !== "object" || tagData.color.length !== 4 ||
            typeof tagData.borderColor !== "object" || tagData.borderColor.length !== 4 ||
            typeof tagData.background !== "object" || tagData.background.length !== 4
        ) throw new TypeError("Please enter a valid rgba array")
        const tagCSS = `color:rgba(${tagData.color.join(', ')});border:1px solid rgba(${tagData.borderColor.join(', ')});border-radius:12px;font-size:11px;font-family:arial;background-color:rgba(${tagData.background.join(', ')});padding: 0px 3px 0px 3px;`
        const method = new Function(`console.${fvalues.logType}('%c${fvalues.text.toUpperCase()}%c ','${tagCSS}',''); return`)
        this.cmethods.push(method)
        console.log(`Your method:\n%cconsole.${fvalues.logType}('%c${fvalues.text.toUpperCase()}%c ','${tagCSS}','')`, 'font-weight:bolder;font-family:arial;')
        cLogs.success("Saved")
    }
    run = (index) => {
        try {
            this.cmethods.at(index).call()
        } catch (err) {
            if (err instanceof TypeError) {
                return console.error("Invalid Index")
            }
            return console.error(err)
        }
    }
}

class Converter {
    static stringToBinary = (string) => string.split('').map(char => String(char).charCodeAt(0).toString(2)).join(' ')
    static binaryToString = (binary) => binary.split(' ').map(char => String.fromCharCode(parseInt(char, 2).toString(10))).join('')
    static stringToHex = (string) => string.split('').map(char => String(char).charCodeAt(0).toString(16)).join(' ')
    static hexToSring = (hex) => hex.split(' ').map(char => String.fromCharCode(parseInt(char, 16).toString(10))).join('')
    static stringToBase32 = (string) => string.split('').map(char => String(char).charCodeAt(0).toString(32)).join(' ')
    static base32ToString = (base32) => base32.split(' ').map(char => String.fromCharCode(parseInt(char, 32).toString(10))).join('')
}

class RandomGenerators {
    static ranNum = (max = 10) => Math.round(Math.random() * Math.max(max, 1))
    static bRanNum = (amount = 1, max = 10) => {
        amount = Math.max(amount, 1);
        let bnum = "s";
        let i = 0;
        while (i < amount) {
            bnum += `.${this.ranNum(max)}`;
            i++;
        }
        return bnum.split('s.').join('').split('.')
    }
    static randHex = (prefix = '') => `${prefix}${Math.floor(Math.random() * Math.pow(16, 6)).toString(16)}`
    static bRandHex = (amount = 1, prefix = '') => {
        amount = Math.max(amount, 1);
        let hexRaw = 's';
        let i = 0;
        while (i < amount) {
            hexRaw += `.${this.randHex(prefix)}`;
            i++;
        }
        return hexRaw.split('s.').join('').split('.');
    }

    static customNumberGenerator = (min = 0, max = 100) => {
        if (max <= 0 || min <= 0) throw new RangeError("Both min and max need to be above 0");
        if (!(min < max)) throw new RangeError("min must be less than max");
        if (max > Math.pow(10, 6)) throw new RangeError(`max must be less than ${Intl.NumberFormat('en-US').format(Math.pow(10, 6))}`);
        return Math.round(Math.random() * Number(max) - Number(min)) + Number(min)
    }
    static UUID = _ => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
    static randomString = (length = 10) => [...Array(length)].map(_ => (Math.random() * 36 | 0).toString(36)).join('')

}

class Formatter {
    static formatNumber = v => new Intl.NumberFormat('en-US').format(v)
    static relativeTime = v => new Intl.RelativeTimeFormat('en-US', { style: 'long' }).format(v)
    static formatCurrency = v => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)
    static list = v => new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' }).format(v)
    static sort = Intl.Collator('en-US', { caseFirst: 'upper', numeric: true }).compare
}

class ArrayAndJSON {
    static combineArrays = (array1, array2) => array1.concat(array2)
    static combineJSON = (json1, json2) => ({ ...json1, ...json2 })
    static arrayToJSON = (array) => {
        let json = {};
        array.forEach((v, i) => {
            json[i] = v;
        });
        return json;
    }
    static JSONToArray = (json, keys = false) => {
        let array = [];
        Object.keys(json).forEach(key => (keys) ? array.push(key, json[key]) : array.push(json[key]));
        return array;
    }
    static arrayToSet = (array) => new Set(array)
    static setToArray = (set) => [...set]
    static arrayToMap = (array) => new Map(array)
    static mapToArray = (map) => [...map]
    static #privateArrayRandomizer = (array) => array.sort(() => Math.random() > 0.5 ? 1 : -1)
    static arrayRandomizer = (array, iterations = 25) => {
        let newArray = array;
        let i = 0;
        while (i < iterations) {
            newArray = this.#privateArrayRandomizer(newArray);
            i++;
        }
        return newArray;
    }
}

class Cryptography {
    static SHA1 = (msg) => {
        const rotate_left = (n, s) => (n << s) | (n >>> (32 - s))
        const cvt_hex = (val) => {
            let str = '';
            for (let i = 7; i >= 0; i--) str += ((val >>> (i * 4)) & 0x0f).toString(16);
            return str;
        };
        const Utf8Encode = (string) => string.replace(/\r\n/g, '\n').split('').map((c) => c.charCodeAt(0)).map(char => { if (char < 128) return String.fromCharCode(char); else if ((char > 127) && (char < 2048)) return String.fromCharCode((char >> 6) | 192) + String.fromCharCode((char & 63) | 128); else return String.fromCharCode((char >> 12) | 224) + String.fromCharCode(((char >> 6) & 63) | 128) + String.fromCharCode((char & 63) | 128); }).join('');
        let blockstart;
        let i, j;
        let W = new Array(80);
        let H0 = 0x67452301;
        let H1 = 0xEFCDAB89;
        let H2 = 0x98BADCFE;
        let H3 = 0x10325476;
        let H4 = 0xC3D2E1F0;
        let A, B, C, D, E;
        let temp;
        msg = Utf8Encode(msg);
        let msg_len = msg.length;
        let word_array = new Array();
        for (i = 0; i < msg_len - 3; i += 4) {
            j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
                msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
            word_array.push(j);
        }
        switch (msg_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
                break;
            case 2:
                i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
                break;
            case 3:
                i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
                break;
        }
        word_array.push(i);
        while ((word_array.length % 16) != 14) word_array.push(0);
        word_array.push(msg_len >>> 29);
        word_array.push((msg_len << 3) & 0x0ffffffff);
        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }
            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }
        return (cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4)).toLowerCase();
    }
}

class Utils {
    __log__
    constructor() {
        this.__log__ = new Logger()
    }
    static CustomMath = CustomMath
    static Time = Timer
    static Keys = Keys
    static Logs = Logger
    static Converter = Converter
    static Random = RandomGenerators
    static Formatter = Formatter
    static ArrayAndJSON = ArrayAndJSON
    static Crypto = Cryptography
    get CustomMath() { return CustomMath }
    get Time() { return Timer }
    get Keys() { return Keys }
    get Logs() { return this.__log__ }
    get Converter() { return Converter }
    get Random() { return RandomGenerators }
    get Formatter() { return Formatter }
    get ArrayAndJSON() { return ArrayAndJSON }
    get Crypto() { return Cryptography }
}

let check = (x) => {
    const passwordField = document.getElementById("psw").value
    const hash = "eb96f934c5166ce0df9e19795e27fc0ccfca9e26";
    const pswfieldhash = Utils.Crypto.SHA1(passwordField)
    if (pswfieldhash == hash || x) {
        document.getElementById("login").remove()
        document.getElementById("blocker").remove()
        document.onkeydown = () => { }
        document.oncontextmenu = () => { }
        setup = () => { }
        check = () => { }
        return;
    }
    document.getElementById('pswCheck').removeAttribute('ch')
}

let setup = () => {
    if (sessionStorage.getItem('key') == "passwordKey-020281ytraps:6169209715") return check(true);
    document.onkeydown = (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.charCodeAt(0) == 73) e.preventDefault();
    }
    document.getElementById("psw").onkeydown = (e) => {
        if (e.code === "Enter") return check()
        if (!document.getElementById("pswCheck").hasAttribute('ch')) return document.getElementById("pswCheck").setAttribute('ch', "");
    }
    document.oncontextmenu = () => { }
}