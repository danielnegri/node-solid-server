/*jslint node: true*/
"use strict";

var mime = require('mime');
var path = require('path');
var $rdf = require('rdflib');

var debug = require('../logging').handlers;
var utils = require('../utils.js');
var header = require('../header.js');

function handler(req, res) {
    var ldp = req.app.locals.ldp;
    debug("PUT -- Request path: " + req.originalUrl);
    debug("PUT -- Text length: " + (req.text ? req.text.length : 'undefined'));
    res.header('MS-Author-Via' , 'SPARQL' );

    var filePath = utils.uriToFilename(req.path, ldp.root);

    ldp.put(filePath, req.text, function(err) {
        if (err) {
            debug("PUT -- Write error: " + err.message);
            return res
                .status(err.status)
                .send("Can't write file: "+ err.message);
        }

        debug("PUT -- Write Ok. Bytes written: " + req.text.length);
        return res.sendStatus(201);
    });
}

exports.handler = handler;