// Global server and build utils
exports.setCachingHeaders = require('~/../server/util/setCachingHeaders');
exports.stringifyStrings = require('~/core/util/stringifyStrings');
exports.urls = require('~/core/util/urls');

// JSON mapping functions
exports.jpath = require('~/core/util/json-mapper').jpath;
exports.mapJson = require('~/core/util/json-mapper').mapJson;
exports.mapEntries = require('~/core/util/json-mapper').mapEntries;
exports.mapComposer = require('~/core/util/json-mapper').mapComposer;

// JSON mapping hooks
exports.useMapper = require('~/core/util/json-mapper').useMapper;
exports.useEntriesMapper = require('~/core/util/json-mapper').useEntriesMapper;
exports.useEntryMapper = require('~/core/util/json-mapper').useEntryMapper;
exports.useComposerMapper = require('~/core/util/json-mapper').useComposerMapper;
