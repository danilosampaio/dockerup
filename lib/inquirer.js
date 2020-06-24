const inquirer = require('inquirer');

module.exports = {
  askApplicationType: (typelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'type',
        message: 'Select the application type:',
        choices: typelist,
        default: ['node-api']
      }
    ];
    return inquirer.prompt(questions);
  },
};