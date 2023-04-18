export default class League {
  constructor(name, teams = [], config = {}) {
    this.name = name;
    this.matchDaySchedule = [];
    this.setup(config);
    this.setupTeams(teams);
    this.summaries = [];
  }

  setup(config) {
    const defaultConfig = { round: 1 };
    this.config = Object.assign(defaultConfig, config);
  }

  setupTeams(teamNames) {
    this.teams = [];
    teamNames.map(team => {
      var teamCustomized = this.customizeTeams(team);
      this.teams.push(teamCustomized);
    });
  }

  customizeTeams(teamName) {
    return {
      name: teamName,
      matchesWon: 0,
      matchesDraw: 0,
      matchesLost: 0,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  }

  getScheduleMatchDays() {
    this.scheduleMatchDays();
  }

  scheduleMatchDays() {
    throw new Error('scheduleMatchDays not implemented');
  }
}
