import { getCharacters } from "rickmortyapi";

type QueryValue = string[] | string | null | undefined;

function checkParameters(
  parameters: Readonly<{ [key: string]: Readonly<QueryValue> }>,
  keys: Readonly<string[]>
) {
  return keys.map((key) => {
    const item = parameters[key];
    if (item === undefined || item === null) {
      return {};
    }
    return { data: item };
  });
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const [page, name, status, species, type, gender] = checkParameters(query, [
    "page",
    "name",
    "status",
    "species",
    "type",
    "gender",
  ]);

  const parameters = {
    ...(page.data !== undefined && { page: Number(page.data) }),
    ...(name.data !== undefined && { name: name.data.toString() }),
    ...(status.data !== undefined && { status: status.data.toString() }),
    ...(species.data !== undefined && { species: species.data.toString() }),
    ...(type.data !== undefined && { type: type.data.toString() }),
    ...(gender.data !== undefined && { gender: gender.data.toString() }),
  };

  return await getCharacters(parameters);
});
