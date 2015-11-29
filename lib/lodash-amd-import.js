var CompositeDisposable;
var LodashAmdImport;
var _ = require('lodash');
CompositeDisposable = require('atom').CompositeDisposable;
var AtomRange = require('atom').Range;

function usedModules(txt) {
  var lodashUsages = /_\.(\w+)/ig;

  var modules = [];
  var myArray;
  while ((myArray = lodashUsages.exec(txt)) !== null) {
    modules.push(myArray[1]);
  }

  return _.uniq(modules);
}

module.exports = LodashAmdImport = {
  subscriptions: null,
  activate: function(state) {
    var self = this;
    var editor = atom.workspace.getActiveTextEditor();
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'lodash-amd-import:import': this.import.bind(this),
      })
    );
  },
  deactivate: function () {
      console.log('lodash-amd-import:deactivate');
      this.subscriptions.dispose();
  },
  import: function() {
    var buffer = atom.workspace.getActivePaneItem().buffer;
    var txt = buffer.getText();

    var existingImports = /['"]_\!([^\'\"]+)(["'])/;
    var match = existingImports.exec(txt);
    var newImportString;
    if (match) {
      var existingModules = match[1].split(',').map(function(mod) {
        return mod.trim();
      });

      var usedMods = usedModules(txt).sort();
      var newMods = _.difference(usedMods, existingModules);
      var removedMods = _.difference(existingModules, usedMods);

      var quoteType = match[2];
      newImportString = quoteType + '_!' + usedMods.join(',') + quoteType;

      var importStatementRange = new AtomRange(
        buffer.positionForCharacterIndex(match.index),
        buffer.positionForCharacterIndex(match.index + match[0].length)
      );

      buffer.setTextInRange(importStatementRange, newImportString);
    } else {
      atom.notifications.addError('Could not find any lodash imports. Only works with one already present.');
    }

  }
};
