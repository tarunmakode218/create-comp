#!/usr/bin/env node

const inquirer = require('inquirer');
const { generateComponent } = require('../core/generator');

// check if user passed direct name
const componentName = process.argv[2];
const option = process.argv[3];
const variant = process.argv[4]; // NEW

async function run() {
  // 👉 If user already gave input → skip questions
  if (componentName) {
    generateComponent(componentName, option,variant);
    return;
  }

  // 👉 Else ask questions
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter component name:',
    },
    {
      type: 'list',
      name: 'style',
      message: 'Choose styling:',
      choices: ['css', 'tailwind'],
    }
  ]);

  const styleOption =
    answers.style === 'css' ? '--css' : '--tailwind';

  generateComponent(answers.name, styleOption, null);
}

run();