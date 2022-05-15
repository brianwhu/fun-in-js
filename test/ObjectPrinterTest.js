#!/usr/bin/env deno run --allow-read

import { ObjectPrinter } from "../homework/ObjectPrinter.js"

if (Deno.args.length > 0) {
    Deno.args.forEach(argument => {
        try {
            let data = JSON.parse(Deno.readTextFileSync(argument));
            ObjectPrinter.yaml(data);
        } catch (x) {
            console.error(`*** ${argument}: ${x.name}`);
            return
        }
    })
} else {
    console.error("Usage: ObjectPrinterTest <json-file> ...");
}
