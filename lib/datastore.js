'use strict';

const elasticsearch = require( 'elasticsearch' );
const debug = require( 'debug' )( 'site-scanner-datastore-elasticsearch' );

const siteScanner = require( 'site-scanner' );

module.exports = class extends siteScanner.Datastore {

    constructor( options ) {
        super( options );
    }

    init( options ) { 

        const config = Object.assign( {}, options.config );
        this._client = new elasticsearch.Client( config );
        this._index = options.index || 'site-scanner';
    }

    /**
     *  Add a reference to the database
     */
    addReference( reference ) {

        debug( 'Add reference', reference );

        return this._client.create( {
            index: this._index,
            type: 'reference',
            body: reference,
        } ); 
       
    }

    /**
     *  Add a result to the database
     */
    addResponse( response ) {

        debug( 'Add response', response );

        return this._client.create( {
            index: this._index,
            type: 'response',
            body: Object.assign( {}, response ),
        } );

    }

};