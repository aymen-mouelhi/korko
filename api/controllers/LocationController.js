/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 06/05/2015.
 */
/**
 * LocationController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    app : function(req, res) {

        return res.view({});
    },

    data: function(req, res){

        var mock = [
            {
                "image": "http://cssdeck.com/uploads/media/items/2/2v3VhAp.png",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed feugiat consectetur pellentesque. Nam ac elit risus,ac blandit dui. Duis rutrum porta tortor ut convallis.Duis rutrum porta tortor ut convallis.",
                "location": {
                    "name": "Comic Strips Café",
                    "location": {
                        "lat": 43.579851,
                        "long": 7.122752999999989
                    },
                    "types": [
                        "book_store",
                        "store",
                        "establishment"
                    ],
                    "address": "3 Avenue 24 Août, Antibes Juan les Pins"
                }
            },
            {
                "image": "http://cssdeck.com/uploads/media/items/1/1swi3Qy.png",
                "text": "Donec a fermentum nisi.",
                "location": {
                    "name": "Cafe des Chineurs",
                    "location": {
                        "lat": 43.582763,
                        "long": 7.1281529999999975
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "28 Rue Aubernon, Antibes Juan les Pins"
                }
            },
            {
                "image": "http://cssdeck.com/uploads/media/items/6/6f3nXse.png",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Café de la Porte du Port",
                    "location": {
                        "lat": 43.582954,
                        "long": 7.12811899999997
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "food",
                        "establishment"
                    ],
                    "address": "32 Rue Aubernon, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/d1/1b/95/d11b95628c9aaf6fcae02d2a1bf9ac4a.jpg",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Café brasserie le vieil Antibes",
                    "location": {
                        "lat": 43.581568,
                        "long": 7.12629800000002
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "1 Rue Thuret, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/18175153/w%3D600_h%3D600_t%3Dfalse/1abc34ebb100b03c4c840a1ab2a97c4453668a9a",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Le Goût-Thé",
                    "location": {
                        "lat": 43.582101,
                        "long": 7.127723999999944
                    },
                    "types": [
                        "cafe",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "13 Rue Aubernon, Antibes"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/59452664/w%3D600_h%3D600_t%3Dfalse/b590b9294982c9781fd96ed178dd27604597abda",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Le Café Jardin",
                    "location": {
                        "lat": 43.580133,
                        "long": 7.1256519999999455
                    },
                    "types": [
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "23 Rue des Bains, Antibes"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/64505723/w%3D600_h%3D600_t%3Dfalse/c905db56d910cc2b8a7e7fb2a12a8d995d4465fd",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Cafe Kanter",
                    "location": {
                        "lat": 43.57755,
                        "long": 7.124166999999943
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "food",
                        "establishment"
                    ],
                    "address": "31 Boulevard Albert 1er, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/64427065/w%3D600_h%3D600_t%3Dfalse/55464fc340b3783f4461fd5ee15ef68dd6c91b26",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Choopy's Cupcakes & Coffee shop",
                    "location": {
                        "lat": 43.580914,
                        "long": 7.124499000000014
                    },
                    "types": [
                        "bakery",
                        "store",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "19 Rue du Marc, Antibes"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/cc/3d/df/cc3ddf58be8e872615d828e77fa1829f.jpg",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed feugiat consectetur pellentesque. Nam ac elit risus,ac blandit dui. Duis rutrum porta tortor ut convallis.Duis rutrum porta tortor ut convallis.",
                "location": {
                    "name": "Cesar Caffe Antibes",
                    "location": {
                        "lat": 43.581713,
                        "long": 7.127633999999944
                    },
                    "types": [
                        "meal_takeaway",
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "5 Rue Aubernon, Antibes"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/25/e1/fa/25e1fa58e37f44d04ae358ae9f404be9.jpg",
                "text": "Donec a fermentum nisi.",
                "location": {
                    "name": "Hotel-Restaurant Le Cameo",
                    "location": {
                        "lat": 43.581143,
                        "long": 7.125182999999993
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "lodging",
                        "food",
                        "establishment"
                    ],
                    "address": "5 Place Nationale, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/56/20/22/562022dc508ffadc79061476625ee4e9.jpg",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Félix Café",
                    "location": {
                        "lat": 43.582865,
                        "long": 7.127891999999974
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "50 Boulevard Aguillon, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/4357365/w%3D600_h%3D600_t%3Dfalse/c3cfbf57c2ca943885b38347bbb588202ee1275c",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Le Glacier - Square sud",
                    "location": {
                        "lat": 43.580386,
                        "long": 7.121460999999954
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "natural_feature",
                        "establishment"
                    ],
                    "address": "3 Place Général de Gaulle, Antibes"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/b0/74/a9/b074a9a66101293cabd0d24b4ba43088.jpg",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Green Milk",
                    "location": {
                        "lat": 43.592758,
                        "long": 7.115679999999998
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "408 Avenue Jules Grec, Antibes"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/59452664/w%3D600_h%3D600_t%3Dfalse/b590b9294982c9781fd96ed178dd27604597abda",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Café Cats",
                    "location": {
                        "lat": 43.580145,
                        "long": 7.122837000000004
                    },
                    "types": [
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "18 Rue Fourmillière, Antibes"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/64505723/w%3D600_h%3D600_t%3Dfalse/c905db56d910cc2b8a7e7fb2a12a8d995d4465fd",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "AMALTHÉ thé café Antibes",
                    "location": {
                        "lat": 43.581074,
                        "long": 7.126787000000036
                    },
                    "types": [
                        "food",
                        "store",
                        "establishment"
                    ],
                    "address": "12 Rue Sade, Antibes"
                }
            },
            {
                "image": "https://prcdn.500px.org/photos/64427065/w%3D600_h%3D600_t%3Dfalse/55464fc340b3783f4461fd5ee15ef68dd6c91b26",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Les P'tits Pains",
                    "location": {
                        "lat": 43.570402,
                        "long": 7.1112869999999475
                    },
                    "types": [
                        "cafe",
                        "food",
                        "establishment"
                    ],
                    "address": "2 Avenue du Maréchal Joffre"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/db/47/81/db4781d8e1d214a58398bdbb1c04bc58.jpg",
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed feugiat consectetur pellentesque. Nam ac elit risus,ac blandit dui. Duis rutrum porta tortor ut convallis.Duis rutrum porta tortor ut convallis.",
                "location": {
                    "name": "Le Saona",
                    "location": {
                        "lat": 43.581,
                        "long": 7.122940999999969
                    },
                    "types": [
                        "meal_takeaway",
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "4 Rue Championnet, Antibes"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/26/a9/c0/26a9c02343360505032ad91dee1ece0a.jpg",
                "text": "Donec a fermentum nisi.",
                "location": {
                    "name": "Grand Café de la gare",
                    "location": {
                        "lat": 43.585374,
                        "long": 7.119876999999974
                    },
                    "types": [
                        "cafe",
                        "bar",
                        "restaurant",
                        "food",
                        "establishment"
                    ],
                    "address": "46 Avenue Robert Soleau, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/a9/29/57/a92957c47c7c8eb5c8b8ea4691ca0131.jpg",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Le Pimm S",
                    "location": {
                        "lat": 43.580519,
                        "long": 7.1225050000000465
                    },
                    "types": ["establishment"],
                    "address": "3 Rue de la République, Antibes Juan les Pins"
                }
            },
            {
                "image": "https://s-media-cache-ak0.pinimg.com/736x/e8/49/af/e849af4b568c55e83071150e68cf805c.jpg",
                "text": "Nullam eget lectus augue. Donec eu sem sit amet ligula faucibus suscipit. Suspendisse rutrum turpis quis nunc convallis quis aliquam mauris suscipit.",
                "location": {
                    "name": "Au Négus Blanc",
                    "location": {
                        "lat": 43.580727,
                        "long": 7.123384999999985
                    },
                    "types": ["establishment"],
                    "address": "20 Rue de la République, Antibes Juan les Pins"
                }
            }

        ];

        return res.send(mock);
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to LocationController)
     */
    _config: {}


};
