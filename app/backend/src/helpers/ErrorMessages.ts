enum ErrorMessages {
  required = 'All fields must be filled',
  incorrectField = 'Incorrect email or password',
  tokenNotFound = 'Token not found',
  invalidToken = 'Must be a valid token',
  userNotFound = 'User not found',
  somethingWentWrong = 'Something went wrong',
  noTeamsFound = 'No teams found',
  noMatchesFound = 'No matches found',
  invalidParameters = 'Invalid parameters',
  invalidData = 'Invalid data',
  twoEqualTeams = 'It is not possible to create a match with two equal teams',
  noTeamWithSuchId = 'There is no team with such id!',
}

export default ErrorMessages;
