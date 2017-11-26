export var TOUR_DB =
[
  { name:'Users Current Location'           , lat:0        , long: 0, picture: require('./Photos/stops/langson.png'), desc:'',            },  //00
  //Shirby
  { name:'Cross Cultural Center'            , lat:33.653283, long: -117.743652, picture: require('./Photos/stops/langson.png'), desc:'',},  //01
  { name:'Aldrich Hall'                     , lat:33.648461, long: -117.840436, picture: require('./Photos/stops/langson.png'), desc:'',},  //02
  { name:'Langson Library'                  , lat:33.647067, long: -117.841051, picture: require('./Photos/stops/langson.png'), desc:'',},  //03
  { name:'Engineering Hall'                 , lat:33.643583, long: -117.841422, picture: require('./Photos/stops/langson.png'), desc:'',},  //04
  { name:'Physical Science Classroom'       , lat:33.643492, long: -117.842575, picture: require('./Photos/stops/langson.png'), desc:'',},  //05
  //Calvin
  { name:'Ayala Science Library'            , lat:33.649421, long: -117.844023, picture: require('./Photos/stops/langson.png'), desc:'',},  //06
  { name:'Berk Hall Nursing Science'        , lat:33.64656 , long: -117.856254, picture: require('./Photos/stops/langson.png'), desc:'',},  //07
  { name:'Humanities Gateway'               , lat:33.648227, long: -117.84443 , picture: require('./Photos/stops/langson.png'), desc:'',},  //08
  { name:'Claire Trevor Theatre'            , lat:33.650742, long: -117.846335, picture: require('./Photos/stops/langson.png'), desc:'',},  //09
  { name:'Mesa Court'                       , lat:33.652979, long: -117.845317, picture: require('./Photos/stops/langson.png'), desc:'',},  //10
  //Kimberly
  { name:'Bren Events Center'               , lat:33.649411, long: -117.846964, picture: require('./Photos/stops/langson.png'), desc:'The Bren Events Center is home to a wide variety of events from sporting events to musical performance to exhibitions and much more. It provides exciting entertainment to thousands of fans each year. '},  //11
  { name:'Arroyo Vista'                     , lat:33.646854, long: -117.829043, picture: require('./Photos/stops/langson.png'), desc:'Arroyo Vista (commonly referred to as AV) is a theme sponsored housing community that provides homes to undergraduates and transfer students. Each house has 16 to 34 residents living in double occupancy rooms. Academic, special theme houses and greek themed homes can be found in Arroyo Vista.'},  //12
  { name:'Vista Del Campo'                  , lat:33.640441, long: -117.824051, picture: require('./Photos/stops/langson.png'), desc:'Vista Del Campo (also known as VDC) is a housing community owned by ACC apartments located on the east side of campus. It is home to undergraduate students (second year and above) and graduate students. VDC provides apartment style homes from 1 Bedroom to 4 Bedroom under lease agreements.'},  //13
  { name:'Anteater Recreation Center'       , lat:33.643361, long: -117.827945, picture: require('./Photos/stops/langson.png'), desc:'The ARC is an indoor 2-floor gym facility equipped with state-of-the art equipment. It provides over 35 free exercise classes, CPR/First Aid classes, personal training and much more. It is home for all club sports and intramural sports every quarter.'},  //14
  { name:'Middle Earth'                     , lat:33.64465 , long: -117.837548, picture: require('./Photos/stops/langson.png'), desc:'Middle Earth is a first year housing community inspired by J.R.R Tolkien’s Lord of the Rings. It has 24 residence halls with 45 to 75 residents and a live-in resident advisor per hall. The community also has a dining hall, music room, study rooms, and a housing office. There is currently construction in the community. '},  //15
  //David
  { name:'Infinity Fountain'                , lat:33.644684, long: -117.843529, picture: require('./Photos/stops/langson.png'), desc:'',},  //16
  { name:'Student Center'                   , lat:33.648811, long: -117.842411, picture: require('./Photos/stops/langson.png'), desc:'',},  //17
  { name:'Brian Pellar Sculpture'           , lat:33.648461, long: -117.840836, picture: require('./Photos/stops/langson.png'), desc:'',},  //18
  { name:'Wilkening Rose Garden'            , lat:33.648461, long: -117.840836, picture: require('./Photos/stops/langson.png'), desc:'',},  //19
  { name:'UCI Flagpoles'                    , lat:33.648018, long: -117.840836, picture: require('./Photos/stops/langson.png'), desc:'',},  //20

];

export var TOUR_ROUTES =
[
  { name: 'Library'           ,route: [0,3,6]},                 //0
  { name: 'Residence Areas'   ,route: [0,10,12,13,15]},         //1
  { name: 'Social Area'       ,route: [0,1,9,11,14,17]},        //2
  { name: 'Landmarks'         ,route: [0,11,16,17,18,19,20]},   //3
]
