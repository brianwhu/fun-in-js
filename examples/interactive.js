import { readLines } from "https://deno.land/std/io/mod.ts";

const input = readLines(Deno.stdin);

console.log("Tell me something");
for (let data = await input.next(); !data.done; data = await input.next()) {
    console.log(data.value);

    if (data.value === "bye") {
        break;
    }
}
