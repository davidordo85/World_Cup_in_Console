export const LOCAL_TEAM = 0;
export const AWAY_TEAM = 1;

export default class League {
  constructor(name, teams = []) {
    this.name = name;
    this.matchDaySchedule = [];
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
    };
  }

  initSchedule() {
    const numberOfMatchDays = this.teamsCustomized.length - 1;
    const numberOfMatchesPerMatchDay = this.teamsCustomized.length / 2;
    for (let i = 0; i < numberOfMatchDays; i++) {
      const matchDay = [];
      for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
        const match = ['local team', 'away team'];
        matchDay.push(match);
      }
      this.matchDaySchedule.push(matchDay);
    }
    console.log(this.mathDaySchedule);
  }

  getTeamNames() {
    return this.teamsCustomized.map(team => team.name);
  }

  setLocalTeams() {
    const teamNames = this.getTeamNames();
    const maxHomeTeams = this.teamsCustomized.length - 2;
    let teamIndex = 0;
    this.matchDaySchedule.forEach(matchDay => {
      matchDay.forEach(match => {
        match[LOCAL_TEAM] = teamNames[teamIndex];
        teamIndex++;
        if (teamIndex > maxHomeTeams) {
          teamIndex = 0;
        }
      });
    });
  }

  setAwayTeams() {
    const teamNames = this.getTeamNames();
    const maxAwayTeams = this.teamsCustomized.length - 2;
    let teamIndex = maxAwayTeams;
    this.matchDaySchedule.forEach(matchDay => {
      let firstMatchFound = false;
      matchDay.forEach(match => {
        if (!firstMatchFound) {
          firstMatchFound = true;
        } else {
          match[AWAY_TEAM] = teamNames[teamIndex];
          teamIndex--;
          if (teamIndex < 0) {
            teamIndex = maxAwayTeams;
          }
        }
      });
    });
  }

  fixLastTeamSchedule() {
    let matchDayNumber = 1;
    const teamNames = this.getTeamNames();
    const lastTeamName = teamNames[teamNames.length - 1];
    this.matchDaySchedule.forEach(matchDay => {
      const firstMatch = matchDay[0];
      if (matchDayNumber % 2 == 0) {
        firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM];
        firstMatch[LOCAL_TEAM] = lastTeamName;
      } else {
        firstMatch[AWAY_TEAM] = lastTeamName;
      }
      matchDayNumber++;
    });
  }

  scheduleMatchDays() {
    this.initSchedule();
    this.setLocalTeams();
    this.setAwayTeams();
    this.fixLastTeamSchedule();
  }
}
