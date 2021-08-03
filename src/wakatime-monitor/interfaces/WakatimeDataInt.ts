export interface WakatimeDataInt {
  data: {
    grand_total: {
      digital: string;
      hours: number;
      minutes: number;
      text: string;
      total_seconds: number;
    };
    projects: {
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
      hours: number;
      minutes: number;
    }[];
    languages: {
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
      hours: number;
      minutes: number;
      seconds: number;
    }[];
    editors: {
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
      hours: number;
      minutes: number;
      seconds: number;
    }[];
    operating_systems: {
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      text: string;
      hours: number;
      minutes: number;
      seconds: number;
    }[];
    range: {
      date: string;
      start: string;
      end: string;
      text: string;
      timezone: string;
    };
  }[];
  cumulative_total: {
    seconds: number;
    text: string;
  };
  start: string;
  end: string;
}
