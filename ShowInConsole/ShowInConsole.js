export default class ShowInConsole {
  constructor(summaries) {
    this.summaries = summaries;
    this.show();
  }

  show() {
    console.log(this.summaries);
  }

  /*   group.summaries.map(summary => {
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
}); */
}
