import League from './League.js';

export const LOCAL_TEAM = 0;
export const AWAY_TEAM = 1;

export default class Schedule extends League {
  constructor(name, teams = [], config = {}) {
    super(name, teams, config);
  }

  initSchedule() {
    const numberOfMatchDays = this.teams.length - 1;
    const numberOfMatchesPerMatchDay = this.teams.length / 2;
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
    return this.teams.map(team => team.name);
  }

  setLocalTeams() {
    const teamNames = this.getTeamNames();
    const maxHomeTeams = this.teams.length - 2;
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
    const maxAwayTeams = this.teams.length - 2;
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

  start() {
    let i = 1;
    for (const matchDay of this.matchDaySchedule) {
      const matchDaySummary = {
        index: i,
        results: [],
        standings: undefined,
      };
      for (const match of matchDay) {
        const result = this.play(match);
        this.updateTeams(result);
        matchDaySummary.results.push(result);
      }
      i++;
      this.getStandings();
      matchDaySummary.standings = this.teams.map(team =>
        Object.assign({}, team),
      );
      this.summaries.push(matchDaySummary);
    }
  }

  getStandings() {
    throw new Error('getStanding not implemented');
  }

  updateTeams(result) {
    throw new Error('updateTeams method not implemented');
  }

  play(match) {
    throw new Error('play method not implemented');
  }
}
