// Utilitaire pour rechercher des communes françaises via l’API officielle
// https://geo.api.gouv.fr/communes

// Ajoute departement et region dans la réponse
export async function fetchCommunes(query: string): Promise<Array<{ nom: string; code: string; codesPostaux: string[]; departement: { code: string; nom: string }; region: { code: string; nom: string } }>> {
  if (!query || query.length < 2) return [];
  const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,code,codesPostaux,departement,region&boost=population&limit=10`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (e) {
    return [];
  }
}
