import { fetchCommunes } from '../src/utils/fetchCommunes';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { nom: 'Paris', code: '75056', codesPostaux: ['75000'], departement: { code: '75', nom: 'Paris' }, region: { code: '11', nom: 'Île-de-France' } }
    ]),
  })
) as jest.Mock;

describe('fetchCommunes', () => {
  it('should return communes matching the query', async () => {
    const result = await fetchCommunes('Paris');
    expect(result).toEqual([
      { nom: 'Paris', code: '75056', codesPostaux: ['75000'], departement: { code: '75', nom: 'Paris' }, region: { code: '11', nom: 'Île-de-France' } }
    ]);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should return empty array if query is too short', async () => {
    const result = await fetchCommunes('P');
    expect(result).toEqual([]);
  });

  it('should return empty array if fetch fails', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API error'));
    const result = await fetchCommunes('Paris');
    expect(result).toEqual([]);
  });
});
