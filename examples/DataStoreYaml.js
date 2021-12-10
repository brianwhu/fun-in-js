import {
    parse as yamlParse,
    parseAll as yamlParseAll,
    stringify as yamlStringify,
} from 'https://deno.land/std@0.82.0/encoding/yaml.ts';

let data = yamlParse(await Deno.readTextFile('data.yaml'));
console.log(data);

data.playerName = 'Steve';

await Deno.writeTextFile("updated.yaml", yamlStringify(data));

