/**
 * This is a pretty-printing facility. Taking an object, this facility prints the content of the object into
 * a text document.
 */
class ObjectPrinter {
    /**
     * Prints an object into a YAML document.
     * 
     * YAML document specification: https://yaml.org/
     * 
     * @param {Object} data - an object with no recusive references
     */
    static yaml(data) {
        // print YAML document mark
        console.log("---");
        // continue with object printing
        let indent = ""
        console.log(ObjectPrinter.printUnknown(indent, data))
    }

    static printUnknown(indent, data) {
        if (data.constructor === Object) {
            return ObjectPrinter.printObject(indent, data, false)
        } else if (data.constructor === Array) {
            return ObjectPrinter.printArray(indent, data)
        } else {
            return data.toString()
        }
    }

    static printObject(indent, data, insideArray) {
        let output = ""
        let names = Object.keys(data)
        for (let i = 0; i < names.length; ++i) {
            let value = data[names[i]]
            let realIndent = i === 0 && insideArray ? '' : indent
            if (value.constructor === Object) {
                output += realIndent + names[i] + ":\n" + this.printObject(indent + "  ", value, false)
            } else if (value.constructor === Array) {
                output += realIndent + names[i] + ":\n" + this.printArray(indent, value)
            } else {
                output += realIndent + names[i] + ": " + value + "\n"
            }
        }
        return output
    }

    static printArray(indent, data) {
        let output = ""
        for (let i = 0; i < data.length; ++i) {
            let value = data[i]
            if (value.constructor === Object) {
                output += indent + "- " + this.printObject(indent + "  ", value, true)
            } else if (value.constructor === Array) {
                output += indent + "-\n" + this.printArray(indent, value)
            } else {
                output += indent + "- " + value + "\n"
            }
        }
        return output
    }
}

export {
    ObjectPrinter
}
