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
    addReference( _references ) {

        debug( 'Add reference', _references );

        const save = [];

        [].concat( _references )
            .forEach( reference => {

                save.push(
                    { create: { _index: this._index, _type: 'reference' } },
                    reference
                );

            } );

        return this._client.bulk( { body: save } ); 
       
    }

    /**
     *  Add a result to the database
     */
    addResponse( response ) {

        debug( 'Add response', response );

        // Body can be a buffer - force to a string
        const body = Object.assign( {}, response );
        body.body = String( body );

        return this._client.create( {
            index: this._index,
            type: 'response',
            body: body,
        } );

    }

};