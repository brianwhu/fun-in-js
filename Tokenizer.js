/**
 * A simple tokenizer for a language in which all special symbols are single-character
 */
class Tokenizer {
    /**
     * Constructs a Tokenizer
     * 
     * @param {symbols} symbols as a string or an array
     * @param {text} text to scan
     */
    constructor(symbols, text) {
        if (symbols.constructor === String) {
            symbols = symbols.split('');
        }
        this.tokens = Tokenizer.scanWithSymbols(text, symbols.reduce((hash, symbol) => (hash[symbol] = true, hash), {}));
        this.point = 0;
    }
    
    /**
     * Retrieves the next token.
     */
    next() {
        if (this.point < this.tokens.length) {
            return this.tokens[this.point++];
        } else {
            return undefined;
        }
    }

    expect(type, value, otherwise) {
        let token = this.next();
        if (token.type !== type || token.value !== value) {
            throw otherwise;
        }
    }

    /**
     * Peek at the next token but does not retrieve it.
     */
    peek() {
        return this.tokens[this.point];
    }

    /**
     * Push the last token back so it can be retrieved again.
     */
    back() {
        if (this.point > 0) --this.point;
    }

    static scanWithSymbols(text, symbols) {
        let tokens = [];

        text.split(/\s/).forEach(word => {
            let p = 0, q = 0;
            while (p < word.length && q < word.length) {
                if (!symbols[word.charAt(q)]) {
                    ++q;
                } else {
                    if (p < q) {
                        Tokenizer.storeNonSymble(tokens, word.substring(p, q));
                    }
                    tokens.push({ type: "SYMBOL", value: word.charAt(q) });
                    p = ++q;
                }
            }
            if (p < q) {
                Tokenizer.storeNonSymble(tokens, word.substring(p, q));
            }
        });
        return tokens;
    }

    static storeNonSymble(tokens, text) {
        let number = Number(text);
        if (Number.isNaN(number)) {
            tokens.push({ type: "UNKNOWN", value: text })
        } else {
            tokens.push({ type: "NUMBER", value: number });
        }
    }
}

export {
    Tokenizer
}

