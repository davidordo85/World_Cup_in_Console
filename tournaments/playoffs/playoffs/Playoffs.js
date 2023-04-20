import SchedulePlayoffs from './SchedulePlayoffs.js';

export default class Playoffs extends SchedulePlayoffs {
  constructor(name, teams = []) {
    super(name, teams);
  }
}
