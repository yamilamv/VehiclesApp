export interface GameModel {
  id: number;
  image: string;
  name: string;
  releaseDate: Date;
  platforms: number[];
  description: string;
}

export class GameModelHelper {
	static default(): GameModel {
		return {
		  id: 0,
      image:  "",
      name:  "",
      releaseDate:  new Date(),
      platforms: [],
      description:  ""
		};
	}
}
