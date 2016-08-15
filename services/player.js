export const getHeroById = (heroesList, heroId) => {
  let result = heroesList.filter( hero => {
    return hero.id === heroId;
  });
  return result[0];
}
