// TODO: check if heroId not need send as an attribute to this method
export const getHeroById = (heroesList, heroId) => {
  const result = heroesList.filter(hero => {
    return hero.id === heroId;
  });
  return result[0];
};

export const updatePlayerModelByHero = (player, hero) => {
	player.heroes.forEach( (char, i) => {
		if (char.id === hero.id) {
			char = hero;
		}
	});

	return player;
};

export const getHeroLevel = (hero) => {
    const exp = 50;
    const lvl = Math.floor(hero.exp / exp);

    return lvl > 0 ? (lvl + 1) : 1;
};
