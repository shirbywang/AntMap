export var TOUR_DB =
[
  { name:'Users Current Location'           , lat:0        , long: 0            },  //00
  //Shirby
  { name:'Cross Cultural Center'            , lat:33.653283, long: -117.743652, },  //01
  { name:'Aldrich Hall'                     , lat:33.648461, long: -117.840436, },  //02
  { name:'Langson Library'                  , lat:33.647067, long: -117.841051, },  //03
  { name:'Engineering Hall'                 , lat:33.643583, long: -117.841422, },  //04
  { name:'Physical Science Classroom'       , lat:33.643492, long: -117.842575, },  //05
  //Calvin
  { name:'Ayala Science Library'            , lat:33.649421, long: -117.844023, },  //06
  { name:'Berk Hall Nursing Science'        , lat:33.64656 , long: -117.856254, },  //07
  { name:'Humanities Gateway'               , lat:33.648227, long: -117.84443 , },  //08
  { name:'Claire Trevor Theatre'            , lat:33.650742, long: -117.846335, },  //09
  { name:'Mesa Court'                       , lat:33.652979, long: -117.845317, },  //10
  //Kimberly
  { name:'Bren Events Center'               , lat:33.649411, long: -117.846964, },  //11
  { name:'Arroyo Vista'                     , lat:33.646854, long: -117.829043, },  //12
  { name:'Vista Del Campo'                  , lat:33.640441, long: -117.824051, },  //13
  { name:'Anteater Recreation Center (ARC)' , lat:33.643361, long: -117.827945, },  //14
  { name:'Middle Earth'                     , lat:33.64465 , long: -117.837548, },  //15
  //David
  { name:'Infinity Fountain'                , lat:33.644684, long: -117.843529, },  //16
  { name:'Student Center'                   , lat:33.648811, long: -117.842411, },  //17
  { name:'Brian Pellar Sculpture'           , lat:33.648461, long: -117.840836, },  //18
  { name:'Laurel L. Wilkening Rose Garden'  , lat:33.648461, long: -117.840836, },  //19
  { name:'UCI Flagpoles'                    , lat:33.648018, long: -117.840836, },  //20

];

export var TOUR_ROUTES =
[
  { name: "Libraries"    ,route: [0,3,6]},                 //0
  { name: "Residences"   ,route: [0,10,12,13,15]},         //1
  { name: "Social Areas" ,route: [0,1,9,11,14,17]},        //2
  { name: "Landmarks"    ,route: [0,11,16,17,18,19,20]},   //3
]
