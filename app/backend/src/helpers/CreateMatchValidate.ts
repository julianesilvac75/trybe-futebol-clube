import * as Joi from 'joi';

class CreateMatchValidate {
  static joi(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const required = Joi.object({
      homeTeam: Joi.number().integer().required(),
      awayTeam: Joi.number().integer().required(),
      homeTeamGoals: Joi.number().integer().required(),
      awayTeamGoals: Joi.number().integer().required(),
    });

    const validation = required.validate({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    if (validation.error) {
      return false;
    }

    return true;
  }

  static equalTeams(homeTeam: number, awayTeam: number) {
    if (homeTeam === awayTeam) {
      return false;
    }

    return true;
  }

  static validateAll(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const joi = this.joi(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    const equalTeams = this.equalTeams(homeTeam, awayTeam);

    if (joi && equalTeams) return [true];

    if (!joi) return [false, 'joi'];

    return [false, 'equalTeams'];
  }
}

export default CreateMatchValidate;
