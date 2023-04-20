import ScheduleLeague from './ScheduleLeague.js';

import {
  LOCAL_TEAM,
  AWAY_TEAM,
} from '../../../teams/customizeTeams/CustomizeTeams.js';
export default class PointsBasedLeague extends ScheduleLeague {
  constructor(name, teams = [], config = []) {
    super(name, teams, config);
  }

  setup(config) {
    const defaultConfig = {
      rounds: 1,
      pointsWin: 3,
      pointsDraw: 1,
      pointsLose: 0,
    };
    this.config = Object.assign(defaultConfig, config);
  }

  customizeTeam(teamName) {
    const customizeTeam = super.customizeTeam(teamName);
    return {
      points: 0,
      matchesWon: 0,
      matchesDraw: 0,
      matchesLost: 0,
      ...customizeTeam,
    };
  }

  play(match) {
    const homeGoals = this.generateGoals();
    const awayGoals = this.generateGoals();
    return {
      homeTeam: match[LOCAL_TEAM],
      homeGoals,
      awayTeam: match[AWAY_TEAM],
      awayGoals,
    };
  }

  getTeamForName(name) {
    return this.teams.find(team => team.name == name);
  }

  updateTeams(result) {
    const homeTeam = this.getTeamForName(result.homeTeam);
    const awayTeam = this.getTeamForName(result.awayTeam);
    if (homeTeam && awayTeam) {
      homeTeam.goalsFor += result.homeGoals;
      homeTeam.goalsAgainst += result.awayGoals;
      awayTeam.goalsFor += result.awayGoals;
      awayTeam.goalsAgainst += result.homeGoals;

      if (result.homeGoals > result.awayGoals) {
        homeTeam.points += this.config.pointsWin;
        homeTeam.matchesWon += 1;
        awayTeam.points += this.config.pointsLose;
        awayTeam.matchesLost += 1;
      } else if (result.homeGoals < result.awayGoals) {
        homeTeam.points += this.config.pointsLose;
        homeTeam.matchesLost += 1;
        awayTeam.points += this.config.pointsWin;
        awayTeam.matchesWon += 1;
      } else {
        homeTeam.points += this.config.pointsDraw;
        homeTeam.matchesDraw += 1;
        awayTeam.points += this.config.pointsDraw;
        awayTeam.matchesDraw += 1;
      }
    }
  }

  getStandings() {
    this.teams.sort(function (teamA, teamB) {
      if (teamA.points > teamB.points) {
        return -1;
      } else if (teamA.points < teamB.points) {
        return 1;
      } else {
        const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst;
        const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst;
        if (goalsDiffA > goalsDiffB) {
          return -1;
        } else if (goalsDiffA < goalsDiffB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
}
