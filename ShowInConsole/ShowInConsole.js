import { teams } from '../teams/teams.js';
import PointsBasedLeague from '../tournaments/playoffs/league/PointsBasedLeague.js';
import Playoffs from '../tournaments/playoffs/playoffs/Playoffs.js';
import Letter from '../utils/numberToLetter.js';
import shuffle from '../utils/shuffle.js';

export default class ShowInConsole {
  constructor(name) {
    this.name = name;
    this.groups = [];
    this.roundsGroups = [];
    this.teamsForPlayOffs = [];
    this.teamsForThirdAndFourthPlace = [];
    this.startTournament();
    //this.createPlayoffs();
  }

  organizeTeams() {
    const teamsForGroup = 4;
    teams.shuffle();
    for (var i = 0; i < teams.length; i = i + teamsForGroup) {
      this.groups.push(teams.slice(i, i + teamsForGroup));
    }
  }

  createGroup() {
    this.organizeTeams();
    this.groups.forEach((group, index) => {
      var group = new PointsBasedLeague(`Group ${Letter(index)}`, group);
      this.roundsGroups.push(group);
    });
  }

  scheduleTournament() {
    this.createGroup();
    this.roundsGroups.forEach(group => {
      group.scheduleMatchDays();
      const teamNames = group.teams.map(team => team.name);
      console.log('                           ');
      console.log(group.name);
      console.log('----------------');
      teamNames.forEach(function (team) {
        console.log(team);
      });
      console.log('                           ');
      group.matchDaySchedule.forEach((matchDay, index = 1) => {
        console.log(`Match day ${index}:`);
        matchDay.forEach(match => {
          const home = match[0];
          const away = match[1];
          console.log(` -${home} vs ${away}`);
        });
        console.log('                           ');
      });
    });
  }

  showGroupTournament(group, summary) {
    console.log(`${group.name} match day ${summary.index}`);
    console.log(`---------------------------------`);
    console.log('                           ');
    summary.results.forEach(result => {
      console.log(
        `${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`,
      );
    });
    console.log('                           ');
    console.table(
      summary.standings.map(team => {
        return {
          Team: team.name,
          Points: team.points,
          PlayedMatches: team.matchesWon + team.matchesDraw + team.matchesLost,
          Won: team.matchesWon,
          Drawn: team.matchesDraw,
          Lost: team.matchesLost,
          GoalsFor: team.goalsFor,
          GoalsAgainst: team.goalsAgainst,
          GoalsDiff: team.goalsFor - team.goalsAgainst,
        };
      }),
    );
  }

  startTournament() {
    this.scheduleTournament();
    console.log('=====================================');
    console.log('=========== Start WorldCup ==========');
    console.log('=====================================');
    console.log('                           ');
    this.roundsGroups.map(group => {
      group.start();
      group.summaries.forEach(summary => {
        if (summary.index === 1) {
          this.showGroupTournament(group, summary);
        }
      });
    });
    this.roundsGroups.map(group => {
      group.summaries.forEach(summary => {
        if (summary.index === 2) {
          this.showGroupTournament(group, summary);
        }
      });
    });
    this.roundsGroups.map(group => {
      group.summaries.forEach(summary => {
        if (summary.index === 3) {
          this.showGroupTournament(group, summary);
          summary.standings.map((team, index) => {
            if (index <= 1) {
              this.teamsForPlayOffs.push(team.name);
            }
          });
        }
      });
    });
    this.createPlayoffs();
  }

  showPlayoffs(round) {
    console.log('                           ');
    console.log(`============= ${round.name} Round ============`);
    console.log('                           ');
    round.summariesPlayoffs.forEach(summary => {
      summary.result.forEach(result => {
        console.log(
          `${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} => ${result.teamWin} `,
        );
      });
    });
    if (round.name !== 'Third and fourth place') {
      this.teamsForPlayOffs = round.filteredTeamsWin;
      this.teamsForThirdAndFourthPlace = round.filteredTeamsLoss;
    }
    if (round.name === 'Final') {
      console.log('                           ');
      console.log(`${this.teamsForPlayOffs} World Champion!!`);
      console.log('                           ');
    }
  }

  createPlayoffs() {
    console.log('======================================');
    console.log('=========== Playoffs begin ===========');
    console.log('======================================');
    console.log('                           ');
    const eighths = new Playoffs('Eighths', this.teamsForPlayOffs);
    eighths.start();
    this.showPlayoffs(eighths);
    const quarter = new Playoffs('Quarter', this.teamsForPlayOffs);
    quarter.start();
    this.showPlayoffs(quarter);
    const semifinals = new Playoffs('Semifinals', this.teamsForPlayOffs);
    semifinals.start();
    this.showPlayoffs(semifinals);
    const thirdAndFourPlace = new Playoffs(
      'Third and fourth place',
      this.teamsForThirdAndFourthPlace,
    );
    thirdAndFourPlace.start();
    this.showPlayoffs(thirdAndFourPlace);
    const final = new Playoffs('Final', this.teamsForPlayOffs);
    final.start();
    this.showPlayoffs(final);
  }
}
