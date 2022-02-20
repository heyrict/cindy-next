/*
 * This file updates the existing lang/{locale}.json file
 * after new keys are extracted to lang/en.json
 */

const fs = require('fs');

const DEFAULT_LOCALE = 'en';
const APPLOCALES = ['en', 'ja'];

const defaultTranslationFileName = `lang/${DEFAULT_LOCALE}.json`;

let localeMappings;
let messageKeys;

// Read latest en locale
try {
  // Parse the old translation message JSON files
  localeMappings = JSON.parse(fs.readFileSync(defaultTranslationFileName));
  messageKeys = Object.keys(localeMappings);
} catch (error) {
  if (error.code !== 'ENOENT') {
    process.stderr.write(
      `There was an error loading this translation file: ${defaultTranslationFileName}
        \n${error}`,
    );
  }
}

// Update language files
for (const locale of APPLOCALES) {
  // Skip en locale
  if (locale === DEFAULT_LOCALE) continue;
  // File to store translation messages into
  const translationFileName = `lang/${locale}.json`;
  if (fs.existsSync(translationFileName)) {
    try {
      // Parse the old translation message JSON files
      const oldLocaleMappings = JSON.parse(
        fs.readFileSync(translationFileName),
      );
      for (const messageKey of messageKeys) {
        if (!(messageKey in oldLocaleMappings)) {
          oldLocaleMappings[messageKey] = messages[messageKey];
        }
      }
      // Update translation file
      fs.writeFileSync(
        translationFileName,
        JSON.stringify(oldLocaleMappings, null, 2),
      );
    } catch (error) {
      if (error.code !== 'ENOENT') {
        process.stderr.write(
          `There was an error loading this translation file: ${translationFileName}
        \n${error}`,
        );
      }
    }
  } else {
    fs.copyFileSync(defaultTranslationFileName, translationFileName);
  }
}
