'use strict';

const elasticsearch = require( 'elasticsearch' );
const expect = require( 'expect' );

const Datastore = require( '../lib/datastore' );

const config = require( './config/config' );

describe( 'datastore', function() {

    let testConfig;
    const index = ( Math.random() + '' + Math.random() ).replace( /\./g, '' );

    before( function() {

        testConfig = {
            index,
            config,
        };

    } );

    after( function() {

        return new elasticsearch.Client( Object.assign( {}, config ) )
            .indices.delete( { index } );
  

    } );

    it( 'is a function', function() {

        expect( Datastore ).toBeA( Function );

    } );

    it( 'initiates a Datastore instance ', function() {

        expect( new Datastore( config ) )
            .toBeA( Datastore );

    } );

    it( 'inherits from siteScanner.Datastore ', function() {

        expect( new Datastore( config ) )
            .toBeA( require( 'site-scanner' ).Datastore );

    } );

    describe( 'addReference', function() {

        it( 'adds a reference', function() {

            const datastore = new Datastore( testConfig );
            return datastore.addReference( {
                url: 'http://www.bbc.co.uk/test',
                source: {
                    nodeName: 'a',
                    attributes: { href: '/test' },
                    base: undefined,
                    url: 'http://www.bbc.co.uk/',
                    type: 'html',
                },
            } );

        } );

        it( 'errors if elastic search cannot be found', function() {

            const errorConfig = {
                index,
                config: {
                    host: 'invalid:9200',
                },
            };

            const datastore = new Datastore( errorConfig );
            return datastore.addReference( {
                url: 'http://www.bbc.co.uk/test',
                source: {
                    nodeName: 'a',
                    attributes: { href: '/test' },
                    base: undefined,
                    url: 'http://www.bbc.co.uk/',
                    type: 'html',
                },
            } )
                .then( () => {
                    throw new Error( 'Should not have been called' );
                } )
                .catch( e => {
                    expect( e.message ).toEqual( 'No Living connections' );
                } );

        } );

    } );

    describe( 'addResponse', function() {

        it( 'adds a response', function() {

            const datastore = new Datastore( testConfig );
            return datastore.addResponse( {
                url: 'http://www.bbc.co.uk/test',
                statusCode: 200,
                statusMessage: 'OK',
                contentType: 'text/html',
                body: '<html><p>lorem ipsum</p>',
                
            } );

        } );

        it( 'errors if elastic search cannot be found', function() {

            const errorConfig = {
                index,
                config: {
                    host: 'invalid:9200',
                },
            };

            const datastore = new Datastore( errorConfig );
            return datastore.addReference( {
                url: 'http://www.bbc.co.uk/test',
                source: {
                    nodeName: 'a',
                    attributes: { href: '/test' },
                    base: undefined,
                    url: 'http://www.bbc.co.uk/',
                    type: 'html',
                },
            } )
                .then( () => {
                    throw new Error( 'Should not have been called' );
                } )
                .catch( e => {
                    expect( e.message ).toEqual( 'No Living connections' );
                } );

        } );


    } );

} );