export interface Game {
  targetEntity: string;
  id: string;
  state:
    | 'IDLE'
    | 'NO_CONTENT'
    | 'GAME_DATA'
    | 'PLATFORM_DATA'
    | 'PLATFORM_DATA_FAMILY'
    | 'PLATFORM_SERVICE'
    | 'FINISHED';
  startTime: string;
  endTime: string;
  information: {
    name: string;
    releaseYear: number;
    communityRating: string;
    platform: string;
    esrb: string;
    developer: string;
    publisher: string;
    overview: string;
    maxPlayers: number;
    videoUrl: string;
    isComplete: boolean;
    digitalPCStore: string;
    dateOfFinish: string;
    cooperationName: string;
    website: string;
  };
  platform: {
    name: string;
    releaseDate: string;
    developer: string;
    manufacturer: string;
    cpu: string;
    memory: string;
    graphics: string;
    sound: string;
    display: string;
    notes: string;
    media: string;
    maxControllers: string;
  };
  platformFamily: string[];
}
