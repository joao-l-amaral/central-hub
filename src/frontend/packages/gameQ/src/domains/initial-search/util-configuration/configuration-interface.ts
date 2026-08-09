export interface Configuration {
  platforms: Platform[];
}

export interface Platform {
  platformName: string;
  selected: boolean;
  icon?: string;
}
