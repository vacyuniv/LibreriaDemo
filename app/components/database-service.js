'use strict';

// Module declaration
var databaseManager = angular.module('databaseManager', []);


// Service
dbManagerService = function($log, $filter){

  // DB Creation
  var schemaBuilder = lf.schema.create('libreriaDemo', 1);

  // Schema declaration of the 3 tables
  schemaBuilder.createTable('User')
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('username', lf.Type.STRING)
    .addColumn('password', lf.Type.STRING)
    .addPrimaryKey(['id'], true) // true means its autoincremental
    .addIndex('idxUsername', ['username'], false, lf.Order.DESC);

  // Schema declaration of the 3 tables
  schemaBuilder.createTable('Author')
    .addColumn('id', lf.Type.INTEGER)
    .addColumn('name', lf.Type.STRING)
    .addColumn('pseudonym', lf.Type.STRING)
    .addPrimaryKey(['id'], true) // true means its autoincremental
    .addIndex('idxUsername', ['username'], false, lf.Order.DESC);

  // Schema declaration of the 3 tables
  schemaBuilder.createTable('Book')
    .addColumn('isbn', lf.Type.INTEGER)
    .addColumn('title', lf.Type.STRING)
    .addColumn('description', lf.Type.STRING)
    .addColumn('imageUrl', lf.Type.STRING)
    .addColumn('authorId', lf.Type.INTEGER)
    .addColumn('basePrice', lf.Type.NUMBER)
    .addForeignKey('fk_authorId',{
      local: 'authorId',
      ref: 'Author.id'
    })
    .addPrimaryKey(['isbn'])
    .addIndex('idxIsbn', ['isbn'], false, lf.Order.DESC);

}

databaseManager.service('dbManager', ['$log', '$filter', dbManagerService] );