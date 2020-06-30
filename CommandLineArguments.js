let CommandLineArguments = {
    get(args, spec) {
        let params = CommandLineArguments.parse(args);
        return spec ? CommandLineArguments.validate(params, spec) : params;
    },

    parse(args) {
        return args.reduce((params, arg) => {
            try {
                return Object.assign(params, Function(`return { ${arg} }`)());
            } catch (x) {
                console.error('*** Error in your command arguments');
                console.error(arg);
                throw x;
            }
        }, {});
    },

    validate(params, spec) {
        let errors = Object.keys(params).filter(name => spec.find(allowed => allowed === name) === undefined).join(", ");
        if (errors) {
            throw `ERROR: Unknown argument(s): ${errors}`
        } else {
            return params;
        }
    }
}

export {
    CommandLineArguments
}
