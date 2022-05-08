#!/usr/bin/env deno run --allow-read

import { ObjectPrinter } from "../homework/ObjectPrinter.js"

Deno.args.forEach(argument => {
    try {
        let data = JSON.parse(Deno.readTextFileSync(argument));
        ObjectPrinter.yaml(data);
    } catch (x) {
        console.error(`*** ${argument}: ${x.name}`);
        return
    }
})

