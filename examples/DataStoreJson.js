let data = JSON.parse(await Deno.readTextFile('data.json'));
console.log(data);

data.playerName = 'Brian';

await Deno.writeTextFile("updated.json", JSON.stringify(data));

