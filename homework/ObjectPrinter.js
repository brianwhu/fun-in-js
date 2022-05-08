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
    }
}

export {
    ObjectPrinter
}
