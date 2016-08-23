export const getHeroById = (heroesList, heroId) => {
  const result = heroesList.filter( hero => {
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
