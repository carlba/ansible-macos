#!/usr/bin/env node

const { execSync } = require('child_process');

process.env.PATH += ':/usr/local/bin';

const fs = require('fs');

function appendToLogFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  fs.appendFileSync('/tmp/aerospacer.log', logMessage, 'utf8');
}

appendToLogFile(`${process.env.PATH}`);

const args = process.argv.slice(2);

appendToLogFile(`Aerospace application started ${args}`);

if (args[0] == 'reload') {
  appendToLogFile(`Killing AeroSpace and restarting it`);
  hardReloadAerospace();

  const foundCbackstromWindow = findAerospaceWindow('Code', 'cbackstrom');
  runCommandSync(`aerospace focus --window-id ${foundCbackstromWindow[0]}`);
  runCommandSync(`aerospace move left`);

  const foundPocketLawWindow = findAerospaceWindow('Code', 'pocketlaw');
  runCommandSync(`aerospace focus --window-id ${foundPocketLawWindow[0]}`);
  runCommandSync(`aerospace move left`);
}

if (args[0] == 'on-workspace-change') {
  appendToLogFile(`Workspace change detected`);
  onWorkspaceChange(parseInt(process.env.AEROSPACE_FOCUSED_WORKSPACE, 10));
}

function onWorkspaceChange(aerospaceFocusedWorkspace) {
  switch (aerospaceFocusedWorkspace) {
    case 1:
    case 2:
    case 3:
      runCommandSync('set_default_browser chrome');
      appendToLogFile(
        `Setting default browser to Chrome for workspace ${aerospaceFocusedWorkspace}`
      );
      break;
    case 4:
    case 5:
    case 6:
      runCommandSync('set_default_browser safari');
      break;
    default:
      console.log(aerospaceFocusedWorkspace);
  }
}

function hardReloadAerospace() {
  runCommandSync(`pkill AeroSpace`);
  runCommandSync(`open -a AeroSpace`);
  runCommandSync(`sleep 0.05`);
}

function runCommandSync(command, timeout = 10000) {
  try {
    const stdout = execSync(command, { stdio: 'pipe', timeout, shell: true });
    return stdout.toString();
  } catch (error) {
    console.error(`Command failed: ${error}`);
    return null; // or throw error to handle it outside this function
  }
}

function findAerospaceWindow(windowName, userName) {
  const output = runCommandSync('aerospace list-windows --all');
  if (!output) {
    console.log('Failed to retrieve windows list or no output produced');
    return null;
  }

  const windows = output.split('\n').map(line =>
    line
      .trim()
      .split('|')
      .map(cell => cell.trim())
  );

  const foundWindow = windows.filter(
    row => row.length > 2 && row[1] === windowName && row[2].includes(userName)
  );

  if (windows.length === 0) {
    console.log(`No window found for ${windowName} with user ${userName}`);
    return null;
  }

  return foundWindow[0]; // Return the ID of the first matching window
}
