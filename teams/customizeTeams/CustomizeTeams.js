export const LOCAL_TEAM = 0;
export const AWAY_TEAM = 1;

export default class CustomizeTeams {
  constructor(name, teams = []) {
    this.name = name;
    this.setupTeams(teams);
  }

  setupTeams(teamNames) {
    this.teams = [];
    for (const teamName of teamNames) {
      const team = this.customizeTeam(teamName);
      this.teams.push(team);
    }
  }

  customizeTeam(teamName) {
    return {
      name: teamName,
      goalsFor: 0,
      goalsAgainst: 0,
    };
  }

  getTeamNames() {
    return this.teams.map(team => team.name);
  }

  generateGoals() {
    return Math.round(Math.random() * 5);
  }
}
