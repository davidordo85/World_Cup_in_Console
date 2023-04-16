export default class League {
  constructor(name, teams = []) {
    this.name = name;
    this.setupTeams(teams);
  }

  setupTeams(teams) {
    this.teamsCustomized = [];
    teams.map(team => {
      var teamCustomized = this.customizeTeams(team);
      this.teamsCustomized.push(teamCustomized);
    });
  }

  customizeTeams(team) {
    return {
      name: team,
      matchesWon: 0,
      matchesDraw: 0,
      matchesLost: 0,
      goalInFavor: 0,
      goalAgainst: 0,
      points: 0,
    };
  }
}
