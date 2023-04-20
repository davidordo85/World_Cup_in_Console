import CustomizeTeams from '../../../teams/customizeTeams/CustomizeTeams.js';

export default class League extends CustomizeTeams {
  constructor(name, teams = [], config = {}) {
    super(name, teams);
    this.matchDaySchedule = [];
    this.setup(config);
    this.summaries = [];
  }

  setup(config) {
    const defaultConfig = { round: 1 };
    this.config = Object.assign(defaultConfig, config);
  }

  getScheduleMatchDays() {
    this.scheduleMatchDays();
  }

  scheduleMatchDays() {
    throw new Error('scheduleMatchDays not implemented');
  }
}
