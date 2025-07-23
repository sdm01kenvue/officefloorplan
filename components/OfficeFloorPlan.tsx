"use client"
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
//@ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  Search,
  Home,
  Filter,
  RotateCcw,
  Maximize2,
  Info,
  Users,
  Building,
  Layers,
  Eye,
  EyeOff,
  Map,
  ChevronDown,
  X,
  Menu,
  Grid,
  Move3D,
} from "lucide-react";

type Feature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { type: string; name: string; items?: string[]; zone?: string };
};

type GeoJSON = {
  type: "FeatureCollection";
  features: Feature[];
};

const geoJson: GeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1026.935669,
              849.098854
            ],
            [
              1026.935669,
              974.560385
            ],
            [
              1171.418737,
              974.560385
            ],
            [
              1171.418737,
              849.098854
            ],
            [
              1026.935669,
              849.098854
            ]
          ]
        ]
      },
      "properties": {
        "type": "Meeting Room",
        "name": "Aveeno",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1026.935669,
              771.5
            ],
            [
              1026.935669,
              849.098854
            ],
            [
              1169.92349,
              849.098854
            ],
            [
              1169.92349,
              771.5
            ],
            [
              1026.935669,
              771.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "connect room",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1056.225747,
              539.5
            ],
            [
              1056.5,
              620.5
            ],
            [
              1111.5,
              620.5
            ],
            [
              1109.965909,
              539.5
            ],
            [
              1056.225747,
              539.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "Solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1109.965909,
              539.5
            ],
            [
              1111.5,
              620.5
            ],
            [
              1168.463118,
              620.5
            ],
            [
              1168.5,
              540.5
            ],
            [
              1109.965909,
              539.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1056.5,
              450
            ],
            [
              1056.225747,
              539.5
            ],
            [
              1168.5,
              540.5
            ],
            [
              1171,
              451
            ],
            [
              1056.5,
              450
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1057.474192,
              334.5
            ],
            [
              1056.5,
              450
            ],
            [
              1171,
              451
            ],
            [
              1172,
              335
            ],
            [
              1057.474192,
              334.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1047.92953,
              166.5
            ],
            [
              1047.92953,
              324.5
            ],
            [
              1171.5,
              325
            ],
            [
              1170,
              166.5
            ],
            [
              1047.92953,
              166.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [
          "7"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1047.92953,
              41.5
            ],
            [
              1047.92953,
              166.5
            ],
            [
              1177,
              166.5
            ],
            [
              1292,
              168
            ],
            [
              1291.5,
              40
            ],
            [
              1047.92953,
              41.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "large meeting room",
        "name": "",
        "items": [
          "11"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1042.486181,
              620.5
            ],
            [
              1042.486181,
              771.5
            ],
            [
              1168.463118,
              771.5
            ],
            [
              1168.463118,
              620.5
            ],
            [
              1042.486181,
              620.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "Open meeting room",
        "name": "",
        "items": [
          "8"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1228,
              450
            ],
            [
              1228,
              530
            ],
            [
              1232,
              539.75
            ],
            [
              1236,
              550
            ],
            [
              1244,
              554.75
            ],
            [
              1258.5,
              558.5
            ],
            [
              1390.5,
              557.5
            ],
            [
              1391.25,
              449.25
            ],
            [
              1228,
              450
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private meeting",
        "name": "",
        "items": [
          "6"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1228,
              358.75
            ],
            [
              1228.445088,
              443.5
            ],
            [
              1329.92651,
              443.5
            ],
            [
              1329,
              337
            ],
            [
              1290,
              337.25
            ],
            [
              1250,
              337.5
            ],
            [
              1240.25,
              341.25
            ],
            [
              1232.5,
              349.5
            ],
            [
              1228,
              358.75
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1333.75,
              336.25
            ],
            [
              1334,
              444
            ],
            [
              1446,
              444.5
            ],
            [
              1445.75,
              357.5
            ],
            [
              1441.5,
              350.75
            ],
            [
              1436,
              343
            ],
            [
              1427.5,
              337.5
            ],
            [
              1333.75,
              336.25
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "5"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1505,
              912.75
            ],
            [
              1506.5,
              967.5
            ],
            [
              1511.75,
              974.75
            ],
            [
              1516.25,
              980
            ],
            [
              1597.75,
              980
            ],
            [
              1597.75,
              913.5
            ],
            [
              1505,
              912.75
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1597.75,
              913.5
            ],
            [
              1597.75,
              980
            ],
            [
              1613,
              981.75
            ],
            [
              1622,
              994.75
            ],
            [
              1629.75,
              1005.5
            ],
            [
              1637.5,
              1011.5
            ],
            [
              1707.25,
              1012
            ],
            [
              1706.75,
              914.75
            ],
            [
              1597.75,
              913.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1707.515529,
              884.997381
            ],
            [
              1707.25,
              1012
            ],
            [
              1811.502349,
              1012.500551
            ],
            [
              1818.50013,
              1005.265371
            ],
            [
              1823.499739,
              996.763993
            ],
            [
              1825.249021,
              887.500276
            ],
            [
              1707.515529,
              884.997381
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1505.930079,
              727
            ],
            [
              1506,
              907.501516
            ],
            [
              1632.510009,
              908.501904
            ],
            [
              1633.90665,
              727
            ],
            [
              1505.930079,
              727
            ]
          ]
        ]
      },
      "properties": {
        "type": "medium meeting room",
        "name": "",
        "items": [
          "9"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1506.420104,
              541
            ],
            [
              1506.420104,
              717
            ],
            [
              1633.896766,
              717
            ],
            [
              1633.896766,
              541
            ],
            [
              1506.420104,
              541
            ]
          ]
        ]
      },
      "properties": {
        "type": "medium meeting room",
        "name": "",
        "items": [
          "9"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1633.90665,
              788.505239
            ],
            [
              1632.447204,
              913.897904
            ],
            [
              1706.75,
              914.75
            ],
            [
              1707.515529,
              884.997381
            ],
            [
              1825.249021,
              887.500276
            ],
            [
              1826.000391,
              789.505514
            ],
            [
              1633.90665,
              788.505239
            ]
          ]
        ]
      },
      "properties": {
        "type": "battery room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1633.896766,
              660.495037
            ],
            [
              1633.448862,
              786.492329
            ],
            [
              1826.000391,
              789.505514
            ],
            [
              1824.501435,
              705.508134
            ],
            [
              1771.988255,
              706.00386
            ],
            [
              1771.482122,
              662.491728
            ],
            [
              1633.896766,
              660.495037
            ]
          ]
        ]
      },
      "properties": {
        "type": "ups room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1631.911867,
              512.977391
            ],
            [
              1633.896766,
              660.495037
            ],
            [
              1785.490082,
              662.501516
            ],
            [
              1785.490082,
              616.00579
            ],
            [
              1825.469464,
              616.514337
            ],
            [
              1823.975075,
              512.9858
            ],
            [
              1631.911867,
              512.977391
            ]
          ]
        ]
      },
      "properties": {
        "type": "mdf room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1505.5,
              472.5
            ],
            [
              1506.420104,
              541
            ],
            [
              1566.923764,
              541
            ],
            [
              1566.923764,
              460.5
            ],
            [
              1518,
              460
            ],
            [
              1505.5,
              472.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1566.923764,
              458
            ],
            [
              1566.923764,
              541
            ],
            [
              1631.911867,
              541
            ],
            [
              1631.911867,
              458
            ],
            [
              1566.923764,
              458
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1631.911867,
              458
            ],
            [
              1631.911867,
              513.498897
            ],
            [
              1751.889902,
              514.5
            ],
            [
              1752,
              459.000689
            ],
            [
              1631.911867,
              458
            ]
          ]
        ]
      },
      "properties": {
        "type": "copy-print",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1504.5,
              334.5
            ],
            [
              1505,
              386.5
            ],
            [
              1510,
              402.5
            ],
            [
              1596,
              402
            ],
            [
              1595.918456,
              242.5
            ],
            [
              1575.5,
              243
            ],
            [
              1504.5,
              334.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1611.466595,
              135
            ],
            [
              1611.466595,
              208
            ],
            [
              1656.708313,
              208
            ],
            [
              1656.708313,
              135
            ],
            [
              1611.466595,
              135
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1661.957352,
              134.25
            ],
            [
              1661.957352,
              208.25
            ],
            [
              1701.950031,
              208.25
            ],
            [
              1701.950031,
              134.25
            ],
            [
              1661.957352,
              134.25
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1709.198703,
              134.5
            ],
            [
              1709.198703,
              206.5
            ],
            [
              1751.191016,
              206.5
            ],
            [
              1751.191016,
              134.5
            ],
            [
              1709.198703,
              134.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1758.689643,
              134.75
            ],
            [
              1758.689643,
              206.25
            ],
            [
              1800.93191,
              206.25
            ],
            [
              1800.93191,
              134.75
            ],
            [
              1758.689643,
              134.75
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1601.89457,
              53
            ],
            [
              1601.89457,
              125
            ],
            [
              1859.847346,
              125
            ],
            [
              1859.847346,
              53
            ],
            [
              1601.89457,
              53
            ]
          ]
        ]
      },
      "properties": {
        "type": "service balcony",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1750.456162,
              1073.5
            ],
            [
              1750.456162,
              1147.5
            ],
            [
              1794.448109,
              1147.5
            ],
            [
              1794.448109,
              1073.5
            ],
            [
              1750.456162,
              1073.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1804.446278,
              1073
            ],
            [
              1804.446278,
              1145
            ],
            [
              1843.43914,
              1145
            ],
            [
              1843.43914,
              1073
            ],
            [
              1804.446278,
              1073
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2077.396309,
              1069
            ],
            [
              2077.396309,
              1142.5
            ],
            [
              2120.888347,
              1142.5
            ],
            [
              2120.888347,
              1069
            ],
            [
              2077.396309,
              1069
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2120.888347,
              1069
            ],
            [
              2120.888347,
              1142.5
            ],
            [
              2170.379286,
              1142.5
            ],
            [
              2170.379286,
              1069
            ],
            [
              2120.888347,
              1069
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo room",
        "name": "",
        "items": [
          "1"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1901.398322,
              905
            ],
            [
              1901.398322,
              1010.5
            ],
            [
              1996.25,
              1012
            ],
            [
              1996,
              905.25
            ],
            [
              1901.398322,
              905
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1996,
              905.25
            ],
            [
              1996.25,
              1012
            ],
            [
              2120,
              1011.5
            ],
            [
              2121,
              904
            ],
            [
              1996,
              905.25
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private room",
        "name": "",
        "items": [
          "6"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2121,
              904
            ],
            [
              2120,
              1011.5
            ],
            [
              2223.75,
              1011.25
            ],
            [
              2305.75,
              908.25
            ],
            [
              2306,
              902.25
            ],
            [
              2121,
              904
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1878.875,
              346.5
            ],
            [
              1879,
              397.5
            ],
            [
              1951.412233,
              399.5
            ],
            [
              1951.412233,
              346
            ],
            [
              1878.875,
              346.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1878.875,
              289
            ],
            [
              1879.375,
              344.5
            ],
            [
              1951.412233,
              344.5
            ],
            [
              1951.412233,
              289.5
            ],
            [
              1878.875,
              289
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2052.25,
              474.5
            ],
            [
              2103.384411,
              474.5
            ],
            [
              2196.867297,
              474.5
            ],
            [
              2196.867297,
              351
            ],
            [
              2157.25,
              351
            ],
            [
              2141.5,
              358
            ],
            [
              2101,
              409.75
            ],
            [
              2052.25,
              474.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2196.867297,
              351
            ],
            [
              2196.867297,
              474.5
            ],
            [
              2297.348902,
              474.5
            ],
            [
              2297.348902,
              351
            ],
            [
              2196.867297,
              351
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2333,
              972.5
            ],
            [
              2333.441336,
              1081.5
            ],
            [
              2424.924588,
              1081.5
            ],
            [
              2425.75,
              971
            ],
            [
              2333,
              972.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "5"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2425.75,
              971
            ],
            [
              2424.924588,
              1081.5
            ],
            [
              2558.900061,
              1081.5
            ],
            [
              2560.5,
              988.75
            ],
            [
              2542.5,
              971
            ],
            [
              2425.75,
              971
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2419.398139,
              352
            ],
            [
              2419.398139,
              470.5
            ],
            [
              2521.379469,
              470.5
            ],
            [
              2521.379469,
              352
            ],
            [
              2419.398139,
              352
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "5"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2531.377639,
              352.5
            ],
            [
              2531.377639,
              472
            ],
            [
              2641.857413,
              472
            ],
            [
              2641.857413,
              352.5
            ],
            [
              2531.377639,
              352.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2651.855583,
              352.5
            ],
            [
              2651.855583,
              470
            ],
            [
              2743.338835,
              470
            ],
            [
              2741.75,
              389.25
            ],
            [
              2722.75,
              360.5
            ],
            [
              2710.25,
              352.5
            ],
            [
              2651.855583,
              352.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2729.361806,
              40
            ],
            [
              2729.361806,
              268.5
            ],
            [
              2858.338194,
              268.5
            ],
            [
              2858.338194,
              40
            ],
            [
              2729.361806,
              40
            ]
          ]
        ]
      },
      "properties": {
        "type": "innovation lab",
        "name": "",
        "items": [
          "9"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2729.361806,
              268.5
            ],
            [
              2729.5,
              293.5
            ],
            [
              2746.25,
              293
            ],
            [
              2764,
              317.5
            ],
            [
              2782.25,
              340.5
            ],
            [
              2791,
              351.75
            ],
            [
              2799.75,
              360.75
            ],
            [
              2810.5,
              363.25
            ],
            [
              2857.5,
              364.25
            ],
            [
              2858.338194,
              268.5
            ],
            [
              2729.361806,
              268.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "opem meeting",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2629.5,
              971
            ],
            [
              2624.625,
              975.625
            ],
            [
              2619.75,
              980.25
            ],
            [
              2617.5,
              988
            ],
            [
              2618.75,
              1075.5
            ],
            [
              2618.75,
              1123
            ],
            [
              2625.25,
              1129
            ],
            [
              2631.25,
              1133.5
            ],
            [
              2859.75,
              1133.5
            ],
            [
              2860.25,
              971.75
            ],
            [
              2629.5,
              971
            ]
          ]
        ]
      },
      "properties": {
        "type": "large meeting room",
        "name": "",
        "items": [
          "11"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2859.799461,
              1117.49938
            ],
            [
              2859.798109,
              1196
            ],
            [
              2940.75,
              1196
            ],
            [
              2940.761142,
              1117.500002
            ],
            [
              2859.799461,
              1117.49938
            ]
          ]
        ]
      },
      "properties": {
        "type": "store room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2860.25,
              971.75
            ],
            [
              2859.800234,
              1117.249382
            ],
            [
              2940.790879,
              1116.75
            ],
            [
              2940.790879,
              1030.5
            ],
            [
              2860.25,
              971.75
            ]
          ]
        ]
      },
      "properties": {
        "type": "cloak room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2464.3705,
              1298.5
            ],
            [
              2464.3705,
              1418
            ],
            [
              2859.798109,
              1418
            ],
            [
              2859.798109,
              1298.5
            ],
            [
              2464.3705,
              1298.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "service balcony",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2859.798109,
              1196
            ],
            [
              2859.798109,
              1418
            ],
            [
              3188.23798,
              1418
            ],
            [
              3188.23798,
              1196
            ],
            [
              2859.798109,
              1196
            ]
          ]
        ]
      },
      "properties": {
        "type": "xl meeting room",
        "name": "",
        "items": [
          "11"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3221.417633,
              37
            ],
            [
              3221.417633,
              147
            ],
            [
              3335.896675,
              147
            ],
            [
              3335.896675,
              37
            ],
            [
              3221.417633,
              37
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3336.396583,
              246
            ],
            [
              3336.396583,
              364
            ],
            [
              3462,
              365
            ],
            [
              3462.873429,
              250
            ],
            [
              3336.396583,
              246
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3337.3964,
              185.5
            ],
            [
              3336.396583,
              247
            ],
            [
              3462.873429,
              250
            ],
            [
              3462.873429,
              186
            ],
            [
              3337.3964,
              185.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "2"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3335.896675,
              37
            ],
            [
              3336.396583,
              184
            ],
            [
              3462.873429,
              184.75
            ],
            [
              3462.873429,
              38.5
            ],
            [
              3335.896675,
              37
            ]
          ]
        ]
      },
      "properties": {
        "type": "IT-Image room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3462.873429,
              138.5
            ],
            [
              3462,
              365
            ],
            [
              3593.849451,
              361.5
            ],
            [
              3593.849451,
              138.5
            ],
            [
              3462.873429,
              138.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "large meeting room",
        "name": "",
        "items": [
          "11"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3462.873429,
              38.5
            ],
            [
              3462.873429,
              138.5
            ],
            [
              3593.349542,
              138.5
            ],
            [
              3593.349542,
              38.5
            ],
            [
              3462.873429,
              38.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3319,
              1052
            ],
            [
              3318.402927,
              1137.978493
            ],
            [
              3327,
              1152
            ],
            [
              3344.5,
              1156
            ],
            [
              3470,
              1156
            ],
            [
              3488,
              1137.5
            ],
            [
              3488,
              1065.5
            ],
            [
              3489,
              1051.25
            ],
            [
              3482.5,
              1040
            ],
            [
              3470.75,
              1033
            ],
            [
              3340,
              1033
            ],
            [
              3319,
              1052
            ]
          ]
        ]
      },
      "properties": {
        "type": "coffee shop",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3582.909671,
              1196
            ],
            [
              3582.909671,
              1417
            ],
            [
              3736,
              1414
            ],
            [
              3735.881666,
              1196
            ],
            [
              3582.909671,
              1196
            ]
          ]
        ]
      },
      "properties": {
        "type": "learning lab",
        "name": "",
        "items": [
          "15"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3735.881666,
              1196
            ],
            [
              3736,
              1414
            ],
            [
              3902,
              1414
            ],
            [
              3901.851281,
              1195
            ],
            [
              3735.881666,
              1196
            ]
          ]
        ]
      },
      "properties": {
        "type": "learning lab",
        "name": "",
        "items": [
          "15"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3545.5,
              1041.25
            ],
            [
              3547,
              1126.25
            ],
            [
              3553.25,
              1136
            ],
            [
              3642.75,
              1136
            ],
            [
              3643.404271,
              1035.5
            ],
            [
              3554.5,
              1033.75
            ],
            [
              3545.5,
              1041.25
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3643.404271,
              1035.5
            ],
            [
              3642.75,
              1136
            ],
            [
              3745.25,
              1136
            ],
            [
              3745.385601,
              1035.5
            ],
            [
              3643.404271,
              1035.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3745.385601,
              1035.5
            ],
            [
              3745.25,
              1136
            ],
            [
              3839.5,
              1135.25
            ],
            [
              3846.25,
              1126.75
            ],
            [
              3845.75,
              1042
            ],
            [
              3838.5,
              1035
            ],
            [
              3745.385601,
              1035.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3884.5,
              272.5
            ],
            [
              3884,
              387.75
            ],
            [
              3897.25,
              401
            ],
            [
              3954.5,
              400.5
            ],
            [
              3954.423948,
              273
            ],
            [
              3884.5,
              272.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "copy-print",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3954.423948,
              273.5
            ],
            [
              3954.5,
              400.5
            ],
            [
              3973.5,
              400.75
            ],
            [
              3972.75,
              383.25
            ],
            [
              4080.75,
              383.25
            ],
            [
              4078.901159,
              273.5
            ],
            [
              3954.423948,
              273.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "5"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3883.25,
              214
            ],
            [
              3884.5,
              272.5
            ],
            [
              3982.5,
              273.5
            ],
            [
              3982.25,
              244.25
            ],
            [
              3982.5,
              215
            ],
            [
              3883.25,
              214
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3982.5,
              215
            ],
            [
              3982,
              273.5
            ],
            [
              4078.901159,
              273.5
            ],
            [
              4078.901159,
              215
            ],
            [
              3982.5,
              215
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4078.901159,
              215
            ],
            [
              4080.75,
              383.25
            ],
            [
              4166,
              382.75
            ],
            [
              4164.5,
              400.75
            ],
            [
              4218.25,
              402.25
            ],
            [
              4233.5,
              397
            ],
            [
              4236,
              387.75
            ],
            [
              4237.372148,
              379.5
            ],
            [
              4235.5,
              233.5
            ],
            [
              4217.75,
              215.5
            ],
            [
              4078.901159,
              215
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private meeting room",
        "name": "",
        "items": [
          "6"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4600.312843,
              134
            ],
            [
              4600.312843,
              209
            ],
            [
              4797.276785,
              209
            ],
            [
              4797.276785,
              134
            ],
            [
              4600.312843,
              134
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo rooms",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4549.322178,
              37.5
            ],
            [
              4549.322178,
              127.5
            ],
            [
              4803.275686,
              127.5
            ],
            [
              4803.275686,
              37.5
            ],
            [
              4549.322178,
              37.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "service balcony",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4823.272026,
              37
            ],
            [
              4823.272026,
              191.5
            ],
            [
              5017.236516,
              191.5
            ],
            [
              5017.236516,
              37
            ],
            [
              4823.272026,
              37
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private-celebration area",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4767.282276,
              242.5
            ],
            [
              4767.282276,
              401
            ],
            [
              4876.262325,
              401
            ],
            [
              4876,
              254.5
            ],
            [
              4869,
              243.5
            ],
            [
              4767.282276,
              242.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4933.251891,
              255.5
            ],
            [
              4933.251891,
              370.5
            ],
            [
              5066.449395,
              371.495139
            ],
            [
              5067.5,
              252.5
            ],
            [
              4933.251891,
              255.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "5"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5067.5,
              252.5
            ],
            [
              5066.400793,
              377
            ],
            [
              5174.207779,
              377
            ],
            [
              5176,
              277
            ],
            [
              5152,
              253
            ],
            [
              5067.5,
              252.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5066.400793,
              377
            ],
            [
              5066.400793,
              506.5
            ],
            [
              5146,
              509.5
            ],
            [
              5175.5,
              476.5
            ],
            [
              5174.207779,
              377
            ],
            [
              5066.400793,
              377
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi private meeting room",
        "name": "",
        "items": [
          "6"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4933.251891,
              370.5
            ],
            [
              4934,
              472.75
            ],
            [
              4943.5,
              474.75
            ],
            [
              4947.25,
              487.25
            ],
            [
              4956.25,
              498.25
            ],
            [
              4968.25,
              505
            ],
            [
              4980.5,
              507.25
            ],
            [
              5066.400793,
              506.5
            ],
            [
              5065.75,
              370.5
            ],
            [
              4933.251891,
              370.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "electricl room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5235,
              464
            ],
            [
              5233.870134,
              589
            ],
            [
              5349.5,
              589
            ],
            [
              5349.348993,
              464
            ],
            [
              5235,
              464
            ]
          ]
        ]
      },
      "properties": {
        "type": "small meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5233.870134,
              589
            ],
            [
              5233.870134,
              720.5
            ],
            [
              5381.343136,
              720.5
            ],
            [
              5381.343136,
              589
            ],
            [
              5233.870134,
              589
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting room",
        "name": "",
        "items": [
          "6"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5249.906101,
              379
            ],
            [
              5249.906101,
              464
            ],
            [
              5348.88798,
              464
            ],
            [
              5348.88798,
              379
            ],
            [
              5249.906101,
              379
            ]
          ]
        ]
      },
      "properties": {
        "type": "semi enclosed solo rooms",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5233.409121,
              720.5
            ],
            [
              5233.409121,
              774.5
            ],
            [
              5381.343136,
              774.5
            ],
            [
              5381.343136,
              720.5
            ],
            [
              5233.409121,
              720.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "solo rooms",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5234.914979,
              774.5
            ],
            [
              5234.914979,
              862
            ],
            [
              5350.393838,
              862
            ],
            [
              5350.393838,
              774.5
            ],
            [
              5234.914979,
              774.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5234.914979,
              862
            ],
            [
              5234.914979,
              955.5
            ],
            [
              5350.393838,
              955.5
            ],
            [
              5350.393838,
              862
            ],
            [
              5234.914979,
              862
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4926.248238,
              888.250069
            ],
            [
              4927.247847,
              964.249931
            ],
            [
              5030.749413,
              963.499724
            ],
            [
              5030.249282,
              888.999862
            ],
            [
              4926.248238,
              888.250069
            ]
          ]
        ]
      },
      "properties": {
        "type": "open meeting room",
        "name": "",
        "items": [
          "4"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4872.460044,
              1088.504437
            ],
            [
              4871.796047,
              1306.99938
            ],
            [
              5018.954515,
              1307.5
            ],
            [
              5018.954515,
              1088.5
            ],
            [
              4872.460044,
              1088.504437
            ]
          ]
        ]
      },
      "properties": {
        "type": "large meeting room",
        "name": "",
        "items": [
          "11"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4871.481513,
              1307.5
            ],
            [
              4871.481513,
              1410.5
            ],
            [
              5018.954515,
              1410.5
            ],
            [
              5018.954515,
              1307.5
            ],
            [
              4871.481513,
              1307.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [
          "3"
        ],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4872.674301,
              1018.001081
            ],
            [
              4872.458529,
              1089.002913
            ],
            [
              5016.911592,
              1088.5
            ],
            [
              5018.999739,
              1017.000551
            ],
            [
              4872.674301,
              1018.001081
            ]
          ]
        ]
      },
      "properties": {
        "type": "store room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2911.865101,
              461
            ],
            [
              2911.865101,
              908
            ],
            [
              3292.795363,
              908
            ],
            [
              3292.795363,
              461
            ],
            [
              2911.865101,
              461
            ]
          ]
        ]
      },
      "properties": {
        "type": "lift lobby",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3292.795363,
              745.5
            ],
            [
              3292.795363,
              908
            ],
            [
              3407.386791,
              908
            ],
            [
              3407.386791,
              745.5
            ],
            [
              3292.795363,
              745.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "mail room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3292.795363,
              600
            ],
            [
              3292.795363,
              744.5
            ],
            [
              3406.882947,
              744.5
            ],
            [
              3406.882947,
              600
            ],
            [
              3292.795363,
              600
            ]
          ]
        ]
      },
      "properties": {
        "type": "interfaith room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3292.795363,
              424
            ],
            [
              3292.795363,
              600
            ],
            [
              3406.872422,
              600
            ],
            [
              3406.872422,
              424
            ],
            [
              3292.795363,
              424
            ]
          ]
        ]
      },
      "properties": {
        "type": "bms-badge room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3407.386791,
              463
            ],
            [
              3407.386791,
              908
            ],
            [
              3501,
              908
            ],
            [
              3503.5,
              456
            ],
            [
              3407.386791,
              463
            ]
          ]
        ]
      },
      "properties": {
        "type": "lift lobby",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3662.852196,
              791
            ],
            [
              3662.852196,
              901.5
            ],
            [
              3749,
              904
            ],
            [
              3762,
              910.5
            ],
            [
              3807,
              909
            ],
            [
              3806.825839,
              791
            ],
            [
              3662.852196,
              791
            ]
          ]
        ]
      },
      "properties": {
        "type": "gents toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3662.852196,
              671.5
            ],
            [
              3662.852196,
              791
            ],
            [
              3879.312569,
              791
            ],
            [
              3879.312569,
              671.5
            ],
            [
              3662.852196,
              671.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "getns restroom",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3806.825839,
              791.5
            ],
            [
              3807,
              909
            ],
            [
              4001,
              910
            ],
            [
              4003.289872,
              791.5
            ],
            [
              3806.825839,
              791.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "ladies wellness room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3879.312569,
              683.5
            ],
            [
              3880.999609,
              791.5
            ],
            [
              4003.289872,
              791.5
            ],
            [
              4004.5,
              683.5
            ],
            [
              3879.312569,
              683.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "physically challenged toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3878.75,
              624.5
            ],
            [
              3879.312569,
              683.5
            ],
            [
              3998.391092,
              683.5
            ],
            [
              3998.5,
              624.5
            ],
            [
              3878.75,
              624.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "janitor room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3671.449024,
              461
            ],
            [
              3671.449024,
              624.5
            ],
            [
              3785.428157,
              624.5
            ],
            [
              3785.428157,
              461
            ],
            [
              3671.449024,
              461
            ]
          ]
        ]
      },
      "properties": {
        "type": "nursing room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3785.428157,
              477.5
            ],
            [
              3785.428157,
              624.5
            ],
            [
              4000.888713,
              624.5
            ],
            [
              4000.888713,
              477.5
            ],
            [
              3785.428157,
              477.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "ladies toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4324.3295,
              618.5
            ],
            [
              4324.3295,
              889
            ],
            [
              4500.297285,
              889
            ],
            [
              4500.297285,
              618.5
            ],
            [
              4324.3295,
              618.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "staircase",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4666.908664,
              464
            ],
            [
              4666.908664,
              593
            ],
            [
              4781.887614,
              593
            ],
            [
              4781.887614,
              464
            ],
            [
              4666.908664,
              464
            ]
          ]
        ]
      },
      "properties": {
        "type": "idf room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4781.887614,
              462.5
            ],
            [
              4781.887614,
              593
            ],
            [
              4876.370317,
              593
            ],
            [
              4876.370317,
              462.5
            ],
            [
              4781.887614,
              462.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "f&b store",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3901.851281,
              917
            ],
            [
              3902,
              1414
            ],
            [
              4871.481513,
              1410.5
            ],
            [
              4872.981239,
              917
            ],
            [
              3901.851281,
              917
            ]
          ]
        ]
      },
      "properties": {
        "type": "cafetaria",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3468.905186,
              1196
            ],
            [
              3468.905186,
              1417
            ],
            [
              3582.909671,
              1417
            ],
            [
              3582.909671,
              1196
            ],
            [
              3468.905186,
              1196
            ]
          ]
        ]
      },
      "properties": {
        "type": "kenvue store",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3188.23798,
              1196
            ],
            [
              3188.23798,
              1418
            ],
            [
              3468.905186,
              1418
            ],
            [
              3468.905186,
              1196
            ],
            [
              3188.23798,
              1196
            ]
          ]
        ]
      },
      "properties": {
        "type": "pantry",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2940.790879,
              908
            ],
            [
              2940.75,
              1196
            ],
            [
              3318,
              1196
            ],
            [
              3320,
              908
            ],
            [
              2940.790879,
              908
            ]
          ]
        ]
      },
      "properties": {
        "type": "reception",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3216.383771,
              150
            ],
            [
              3216.383771,
              364
            ],
            [
              3336.396583,
              364
            ],
            [
              3336.396583,
              150
            ],
            [
              3216.383771,
              150
            ]
          ]
        ]
      },
      "properties": {
        "type": "tech bar",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2860.948841,
              37
            ],
            [
              2860.948841,
              364.5
            ],
            [
              3221.417633,
              364.5
            ],
            [
              3221.417633,
              37
            ],
            [
              2860.948841,
              37
            ]
          ]
        ]
      },
      "properties": {
        "type": "pantry",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2436.950946,
              470
            ],
            [
              2436.950946,
              624.5
            ],
            [
              2743.338835,
              624.5
            ],
            [
              2743.338835,
              470
            ],
            [
              2436.950946,
              470
            ]
          ]
        ]
      },
      "properties": {
        "type": "ladies toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2478.44335,
              624.5
            ],
            [
              2478.44335,
              691
            ],
            [
              2552.429805,
              691
            ],
            [
              2552.429805,
              624.5
            ],
            [
              2478.44335,
              624.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "gender neutral toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2429.952227,
              691
            ],
            [
              2429.952227,
              768
            ],
            [
              2519.935754,
              768
            ],
            [
              2519.935754,
              691
            ],
            [
              2429.952227,
              691
            ]
          ]
        ]
      },
      "properties": {
        "type": "physically challenged toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2399.45781,
              691
            ],
            [
              2399.45781,
              768.5
            ],
            [
              2429.952227,
              768.5
            ],
            [
              2429.952227,
              691
            ],
            [
              2399.45781,
              691
            ]
          ]
        ]
      },
      "properties": {
        "type": "janitor room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2603.749674,
              781
            ],
            [
              2603.442068,
              889.5
            ],
            [
              2740.895302,
              889.5
            ],
            [
              2740.395394,
              781
            ],
            [
              2603.749674,
              781
            ]
          ]
        ]
      },
      "properties": {
        "type": "gents toilet",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2559.428523,
              671
            ],
            [
              2559.428523,
              781
            ],
            [
              2740.395394,
              781
            ],
            [
              2740.395394,
              671
            ],
            [
              2559.428523,
              671
            ]
          ]
        ]
      },
      "properties": {
        "type": "gents restroom",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1026.935669,
              974.560385
            ],
            [
              1027.5,
              1173
            ],
            [
              1028,
              1335.5
            ],
            [
              1446.903173,
              1339.5
            ],
            [
              1446.5,
              1074
            ],
            [
              1389.5,
              1073.5
            ],
            [
              1390.5,
              972
            ],
            [
              1314,
              972.5
            ],
            [
              1235,
              972
            ],
            [
              1026.935669,
              974.560385
            ]
          ]
        ]
      },
      "properties": {
        "type": "pantry",
        "name": "",
        "items": [],
        "id": "OR7nrS8Jdz"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1951.412233,
              289.5
            ],
            [
              1952.375,
              401.75
            ],
            [
              2027.875,
              401.75
            ],
            [
              2037.875,
              397.625
            ],
            [
              2048.75,
              386.25
            ],
            [
              2093.25,
              328.125
            ],
            [
              2095.125,
              301.5
            ],
            [
              2074,
              287.75
            ],
            [
              1951.412233,
              289.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "connect room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1936.500913,
              617
            ],
            [
              1937.000783,
              888.000276
            ],
            [
              2123.498173,
              887
            ],
            [
              2124.419646,
              617
            ],
            [
              1936.500913,
              617
            ]
          ]
        ]
      },
      "properties": {
        "type": "staircase",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1890.462477,
              474.5
            ],
            [
              1890.462477,
              617
            ],
            [
              2124.419646,
              617
            ],
            [
              2124.419646,
              474.5
            ],
            [
              1890.462477,
              474.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "lift lobby",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3503.417886,
              470.994074
            ],
            [
              3501.073915,
              899.003143
            ],
            [
              3669.75,
              897.25
            ],
            [
              3671.449024,
              472.5
            ],
            [
              3503.417886,
              470.994074
            ]
          ]
        ]
      },
      "properties": {
        "type": "staircase",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4626.305888,
              768
            ],
            [
              4626.305888,
              896.5
            ],
            [
              4760.411318,
              896.5
            ],
            [
              4760.411318,
              768
            ],
            [
              4626.305888,
              768
            ]
          ]
        ]
      },
      "properties": {
        "type": "handwash",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4626.305888,
              643.5
            ],
            [
              4626.305888,
              768
            ],
            [
              4760.911226,
              768
            ],
            [
              4760.911226,
              643.5
            ],
            [
              4626.305888,
              643.5
            ]
          ]
        ]
      },
      "properties": {
        "type": "plate drop off-collection and dish wash",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              712.046126,
              924
            ],
            [
              712.046126,
              1092
            ],
            [
              966.999451,
              1092
            ],
            [
              966.999451,
              924
            ],
            [
              712.046126,
              924
            ]
          ]
        ]
      },
      "properties": {
        "type": "staircase",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2435.972727,
              781
            ],
            [
              2435.972727,
              911.5
            ],
            [
              2603.442068,
              911.5
            ],
            [
              2603.442068,
              781
            ],
            [
              2435.972727,
              781
            ]
          ]
        ]
      },
      "properties": {
        "type": "gents wellness room",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2740.895302,
              481
            ],
            [
              2741.749804,
              897.252137
            ],
            [
              2911.865101,
              898.502481
            ],
            [
              2911.865101,
              481
            ],
            [
              2740.895302,
              481
            ]
          ]
        ]
      },
      "properties": {
        "type": "staircase",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4314.448566,
              472
            ],
            [
              4314.448566,
              598
            ],
            [
              4555.904362,
              598
            ],
            [
              4555.904362,
              472
            ],
            [
              4314.448566,
              472
            ]
          ]
        ]
      },
      "properties": {
        "type": "lift lobby",
        "name": "",
        "items": [],
        "zone": "",
        "id": "LdnX-CqhNe"
      }
    }
  ]
} ; 

// Normalize room types to correct typos
const normalizeRoomType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    "opem meeting": "open meeting",
    "electricl room": "electrical room",
    "getns restroom": "gents restroom",
    cafetaria: "cafeteria",
  };
  return typeMap[type.toLowerCase()] || type;
};

// Calculate bounds for centering
const calculateBounds = (features: Feature[]) => {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  features.forEach(feature => {
    feature.geometry.coordinates[0].forEach(([x, y]) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });
  return { minX, minY, maxX, maxY };
};

// Calculate room centroid
const getCentroid = (coords: number[][]): [number, number] => {
  const x = coords.reduce((sum, [x]) => sum + x, 0) / coords.length;
  const y = coords.reduce((sum, [, y]) => sum + y, 0) / coords.length;
  return [x, y];
};

const OfficeFloorPlan = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationRef = useRef<number | null>(null);
  const labelsRef = useRef<HTMLDivElement[]>([]);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const minimapRef = useRef<THREE.WebGLRenderer | null>(null);
  const minimapCameraRef = useRef<THREE.OrthographicCamera | null>(null);

  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Feature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showLabels, setShowLabels] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [activeZone, setActiveZone] = useState<string>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roomColors: { [key: string]: number } = {
    "Meeting Room": 0x4a90e2,
    "connect room": 0x50e3c2,
    "solo room": 0xf5a623,
    "small meeting": 0x9013fe,
    "open meeting": 0x26a69a,
    "large meeting room": 0x6d4c41,
    "Open meeting room": 0xffca28,
    "semi private meeting": 0x42a5f5,
    "medium meeting room": 0xab47bc,
    "battery room": 0xb0bec5,
    "ups room": 0xb0bec5,
    "mdf room": 0xb0bec5,
    "copy-print": 0x78909c,
    "semi enclosed solo room": 0xff7043,
    "service balcony": 0xdce775,
    "semi private room": 0x66bb6a,
    "innovation lab": 0xec407a,
    "store room": 0xb0bec5,
    "cloak room": 0xb0bec5,
    "xl meeting room": 0x7e57c2,
    "learning lab": 0x29b6f6,
    "IT-Image room": 0xb0bec5,
    "coffee shop": 0x8d6e63,
    "gents toilet": 0x4dd0e1,
    "gents restroom": 0x4dd0e1,
    "ladies wellness room": 0xf48fb1,
    "physically challenged toilet": 0x4dd0e1,
    "janitor room": 0xb0bec5,
    "nursing room": 0xf06292,
    "ladies toilet": 0xf06292,
    "staircase": 0x90a4ae,
    "idf room": 0xb0bec5,
    "f&b store": 0xb0bec5,
    cafeteria: 0xffb300,
    "kenvue store": 0xb0bec5,
    pantry: 0xffb300,
    reception: 0x5d4037,
    "tech bar": 0x90a4ae,
    "gender neutral toilet": 0x4dd0e1,
    "semi enclosed solo rooms": 0xff7043,
    "semi private-celebration area": 0xec407a,
    "electrical room": 0xb0bec5,
    "lift lobby": 0xdce775,
    "mail room": 0xb0bec5,
    "interfaith room": 0xf06292,
    "bms-badge room": 0xb0bec5,
    default: 0x90a4ae,
  };

  const getRoomIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      "Meeting Room": "🏢",
      "connect room": "🤝",
      "solo room": "🎯",
      "small meeting": "📊",
      "open meeting": "📣",
      "large meeting room": "🏛️",
      "Open meeting room": "📣",
      "semi private meeting": "🔒",
      "medium meeting room": "🏢",
      "battery room": "🔋",
      "ups room": "🔌",
      "mdf room": "🖥️",
      "copy-print": "🖨️",
      "semi enclosed solo room": "🎯",
      "service balcony": "🌳",
      "semi private room": "🔒",
      "innovation lab": "💡",
      "store room": "📦",
      "cloak room": "🧥",
      "xl meeting room": "🏛️",
      "learning lab": "📚",
      "IT-Image room": "💻",
      "coffee shop": "☕",
      "gents toilet": "🚹",
      "gents restroom": "🚹",
      "ladies wellness room": "🌸",
      "physically challenged toilet": "♿",
      "janitor room": "🧹",
      "nursing room": "🍼",
      "ladies toilet": "🚺",
      "staircase": "🪜",
      "idf room": "🖥️",
      "f&b store": "🍽️",
      cafeteria: "🍴",
      "kenvue store": "🏬",
      pantry: "🍎",
      reception: "📋",
      "tech bar": "🛠️",
      "gender neutral toilet": "🚻",
      "semi enclosed solo rooms": "🎯",
      "semi private-celebration area": "🎉",
      "electrical room": "⚡️",
      "lift lobby": "🛗",
      "mail room": "✉️",
      "interfaith room": "🙏",
      "bms-badge room": "🛡️",
      default: "🏪",
    };
    return icons[type.toLowerCase()] || icons.default;
  };

  const getRoomColor = (type: string): number => {
    return roomColors[type.toLowerCase()] || roomColors.default;
  };

  const roomStats = geoJson.features.reduce((acc, feature) => {
    const type = normalizeRoomType(feature.properties.type);
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const zones = [...new Set(geoJson.features.map(f => f.properties.zone).filter(Boolean))];
  const roomTypes = [...new Set(geoJson.features.map(f => normalizeRoomType(f.properties.type)))];

  const filteredRooms = geoJson.features.filter(feature => {
    const query = searchQuery.toLowerCase();
    const normalizedType = normalizeRoomType(feature.properties.type);
    const matchesSearch =
      feature.properties.name.toLowerCase().includes(query) ||
      normalizedType.toLowerCase().includes(query);
    const matchesFilter = selectedFilter === "all" || normalizedType === selectedFilter;
    const matchesZone = activeZone === "all" || feature.properties.zone === activeZone;
    return matchesSearch && matchesFilter && matchesZone;
  });

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const focusOnRoom = useCallback((feature: Feature) => {
    if (cameraRef.current && controlsRef.current) {
      const centroid = getCentroid(feature.geometry.coordinates[0]);
      const bounds = calculateBounds(geoJson.features);
      const centerX = (bounds.minX + bounds.maxX) / 2;
      const centerY = (bounds.minY + bounds.maxY) / 2;
      const scale = 1;
      const x = (centroid[0] - centerX) * scale;
      const z = -((centroid[1] - centerY) * scale);
      cameraRef.current.position.set(x, 300, z + 300);
      controlsRef.current.target.set(x, 0, z);
      controlsRef.current.update();
      setSelectedRoom(feature);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || geoJson.features.length === 0) {
      setError("No valid GeoJSON data or container found.");
      setIsLoading(false);
      return;
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    scene.fog = new THREE.Fog(0x1e293b, 1000, 3000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000);
    camera.position.set(0, 2000, 1500);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: "highp",
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 3000;
    controls.maxPolarAngle = viewMode === "2d" ? 0 : Math.PI / 2;
    controlsRef.current = controls;

    const minimapRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    minimapRenderer.setSize(200, 150);
    minimapRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    minimapRenderer.domElement.className = "absolute bottom-4 right-4 border-2 border-gray-700 rounded-lg shadow-lg";
    minimapRef.current = minimapRenderer;
    if (showMinimap) containerRef.current.appendChild(minimapRenderer.domElement);

    const bounds = calculateBounds(geoJson.features);
    const minimapCamera = new THREE.OrthographicCamera(
      bounds.minX - 100,
      bounds.maxX + 100,
      bounds.maxY + 100,
      bounds.minY - 100,
      0.1,
      5000
    );
    minimapCamera.position.set(0, 1000, 0);
    minimapCamera.lookAt(0, 0, 0);
    minimapCameraRef.current = minimapCamera;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(1000, 1600, 1000);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 4096;
    mainLight.shadow.mapSize.height = 4096;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 5000;
    mainLight.shadow.camera.left = -2000;
    mainLight.shadow.camera.right = 2000;
    mainLight.shadow.camera.top = 2000;
    mainLight.shadow.camera.bottom = -2000;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-1000, 1200, -1000);
    scene.add(fillLight);

    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    const scale = 1;

    geoJson.features.forEach((feature, index) => {
      const coords = feature.geometry.coordinates[0].map(([x, y]) => [
        (x - centerX) * scale,
        -((y - centerY) * scale),
      ]);

      const shape = new THREE.Shape();
      coords.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));

      const area = Math.abs(
        coords.reduce((acc, [x, y], i) => {
          const next = coords[(i + 1) % coords.length];
          return acc + (x * next[1] - next[0] * y);
        }, 0)
      ) / 2;
      const roomHeight = Math.max(15, Math.min(50, area / 1000 * 20 + 20));

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: viewMode === "2d" ? 0.1 : roomHeight,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 2,
      });

      const normalizedType = normalizeRoomType(feature.properties.type);
      const color = getRoomColor(normalizedType);
      const material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        shininess: 50,
        specular: 0x555555,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = 0;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { feature, index, originalColor: color };
      meshesRef.current.push(mesh);
      scene.add(mesh);

      if (showLabels) {
        const centroid = getCentroid(feature.geometry.coordinates[0]);
        const labelCenterX = (centroid[0] - centerX) * scale;
        const labelCenterY = -((centroid[1] - centerY) * scale);

        const label = document.createElement("div");
        const roomName = feature.properties.name || normalizedType;
        const capacity = feature.properties.items?.[0] || "N/A";

        label.innerHTML = `
          <div class="flex items-center space-x-2">
            <span class="text-lg">${getRoomIcon(normalizedType)}</span>
            <span class="font-medium text-sm">${roomName}</span>
            ${capacity !== "N/A" ? `<span class="text-xs text-gray-400">(${capacity})</span>` : ""}
          </div>
        `;

        const colorHex = `#${color.toString(16).padStart(6, "0")}`;
        label.className = `
          absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2
          font-sans text-white bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-1
          border border-gray-700 shadow-md transition-opacity duration-300
        `;
        (label as any).userData = { centerX: labelCenterX, centerY: labelCenterY };
        containerRef.current?.appendChild(label);
        labelsRef.current.push(label);
      }
    });

    const floorGeometry = new THREE.PlaneGeometry(6000, 4000);
    const floorMaterial = new THREE.MeshLambertMaterial({
      color: 0x2d3748,
      transparent: true,
      opacity: 0.9,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -5;
    floor.receiveShadow = true;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(6000, 60, 0x4a5568, 0x2d3748);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshesRef.current);

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        const feature = mesh.userData.feature as Feature;
        focusOnRoom(feature);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshesRef.current);

      meshesRef.current.forEach(mesh => {
        const material = mesh.material as THREE.MeshPhongMaterial;
        material.color.setHex(mesh.userData.originalColor);
        material.emissive.setHex(0x000000);
      });

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        const material = mesh.material as THREE.MeshPhongMaterial;
        material.emissive.setHex(0x666666);
        const feature = mesh.userData.feature as Feature;
        setHoveredRoom(feature.properties.name || normalizeRoomType(feature.properties.type));
        document.body.style.cursor = "pointer";
      } else {
        setHoveredRoom(null);
        document.body.style.cursor = "default";
      }
    };

    renderer.domElement.addEventListener("click", onMouseClick);
    renderer.domElement.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      controls.update();

      labelsRef.current.forEach(label => {
        if ((label as any).userData) {
          const userData = (label as any).userData;
          const vector = new THREE.Vector3(userData.centerX, 40, userData.centerY).project(camera);

          if (vector.z < 1) {
            const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
            const y = (-vector.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
            label.style.left = `${x}px`;
            label.style.top = `${y}px`;
            const distance = camera.position.distanceTo(
              new THREE.Vector3(userData.centerX, 0, userData.centerY)
            );
            const opacity = showLabels ? Math.max(0.5, Math.min(1, (1500 - distance) / 1000)) : 0;
            label.style.opacity = opacity.toString();
            label.style.visibility = opacity > 0.5 ? "visible" : "hidden";
          } else {
            label.style.visibility = "hidden";
          }
        }
      });

      if (showMinimap && minimapRenderer && minimapCamera) {
        minimapRenderer.render(scene, minimapCamera);
      }

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setIsLoading(false);

    const onWindowResize = debounce(() => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    }, 100);

    window.addEventListener("resize", onWindowResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.domElement.removeEventListener("click", onMouseClick);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      labelsRef.current.forEach(label => label.remove());
      labelsRef.current = [];
      renderer.dispose();
      if (minimapRenderer) {
        minimapRenderer.dispose();
        if (containerRef.current?.contains(minimapRenderer.domElement))
          containerRef.current.removeChild(minimapRenderer.domElement);
      }
      if (containerRef.current?.contains(renderer.domElement))
        containerRef.current.removeChild(renderer.domElement);
      document.body.style.cursor = "default";
    };
  }, [showLabels, viewMode, showMinimap]);

  const resetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 2000, 1500);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      setSelectedRoom(null);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "3d" ? "2d" : "3d");
    if (cameraRef.current && controlsRef.current) {
      controlsRef.current.maxPolarAngle = viewMode === "3d" ? 0 : Math.PI / 2;
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans overflow-hidden">
      {error && (
        <div className="absolute inset-0 bg-gray-900/95 flex items-center justify-center z-50">
          <div className="text-center p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
            <p className="text-red-400 font-semibold text-lg mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Error
            </p>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/95 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-blue-500 border-gray-600 mx-auto mb-4"></div>
              <Building className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-500" />
            </div>
            <p className="text-gray-200 font-semibold text-lg">Loading Floor Plan...</p>
          </div>
        </div>
      )}

      {selectedRoom && (
        <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <span className="mr-2">{getRoomIcon(normalizeRoomType(selectedRoom.properties.type))}</span>
                {selectedRoom.properties.name || normalizeRoomType(selectedRoom.properties.type)}
              </h3>
              <button
                onClick={() => setSelectedRoom(null)}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            <div className="text-sm text-gray-300 space-y-2">
              <p><span className="font-medium text-gray-200">Type:</span> {normalizeRoomType(selectedRoom.properties.type)}</p>
              <p><span className="font-medium text-gray-200">Capacity:</span> {selectedRoom.properties.items?.[0] || "N/A"}</p>
              <p><span className="font-medium text-gray-200">Zone:</span> {selectedRoom.properties.zone || "N/A"}</p>
            </div>
            <button
              onClick={() => setSelectedRoom(null)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-b border-gray-700 z-30">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative group"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-gray-300" />
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-500" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-200">Office Navigator</h1>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={toggleViewMode}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative group"
              aria-label={`Switch to ${viewMode === "3d" ? "2D" : "3D"} view`}
            >
              {viewMode === "3d" ? <Grid className="h-5 w-5 text-gray-300" /> : <Move3D className="h-5 w-5 text-gray-300" />}
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                {viewMode === "3d" ? "2D View" : "3D View"}
              </span>
            </button>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative group"
              aria-label={showLabels ? "Hide labels" : "Show labels"}
            >
              {showLabels ? <Eye className="h-5 w-5 text-gray-300" /> : <EyeOff className="h-5 w-5 text-gray-300" />}
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                {showLabels ? "Hide Labels" : "Show Labels"}
              </span>
            </button>
            <button
              onClick={() => setShowMinimap(!showMinimap)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative group"
              aria-label={showMinimap ? "Hide minimap" : "Show minimap"}
            >
              <Map className="h-5 w-5 text-gray-300" />
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                {showMinimap ? "Hide Minimap" : "Show Minimap"}
              </span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative group"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize2 className="h-5 w-5 text-gray-300" />
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              </span>
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative group"
              aria-label="Reset view"
            >
              <RotateCcw className="h-5 w-5 text-gray-300" />
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                Reset View
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-16 left-0 bg-gray-800/95 backdrop-blur-lg rounded-r-xl shadow-xl p-4 z-20 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-14" : "w-64 sm:w-72"
        }`}
      >
        {sidebarCollapsed ? (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
            aria-label="Expand sidebar"
          >
            <Menu className="h-5 w-5 text-gray-300 mx-auto" />
          </button>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-500" />
                Room Directory
              </h2>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                aria-label="Collapse sidebar"
              >
                <X className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
              aria-label="Search rooms"
            />
            <div className="mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1.5 text-sm font-semibold text-gray-300 hover:text-blue-400 transition-colors"
                aria-expanded={showFilters}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
              {showFilters && (
                <div className="mt-3 space-y-3">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-700 text-gray-200"
                    aria-label="Filter by room type"
                  >
                    <option value="all">All Room Types</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <select
                    value={activeZone}
                    onChange={(e) => setActiveZone(e.target.value)}
                    className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-700 text-gray-200"
                    aria-label="Filter by zone"
                  >
                    <option value="all">All Zones</option>
                    {zones.map(zone => (
                      <option key={zone} value={zone}>
                        Zone {zone}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
              {filteredRooms.map(feature => (
                <button
                  key={feature.properties.name || feature.properties.type + feature.geometry.coordinates[0][0].toString()}
                  onClick={() => focusOnRoom(feature)}
                  className="w-full text-left p-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm text-gray-200"
                >
                  <span className="text-lg">{getRoomIcon(normalizeRoomType(feature.properties.type))}</span>
                  <span>{feature.properties.name || normalizeRoomType(feature.properties.type)}</span>
                  {feature.properties.items?.[0] && (
                    <span className="text-xs text-gray-400">({feature.properties.items[0]})</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="absolute top-20 right-4 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl p-4 z-10 max-w-xs w-full">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center mb-3">
          <Info className="h-5 w-5 mr-2 text-blue-500" />
          Office Statistics
        </h3>
        <div className="text-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center">
              <Building className="h-4 w-4 mr-1" />
              Total Spaces
            </span>
            <span className="font-medium text-blue-400">{geoJson.features.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center">
              <Layers className="h-4 w-4 mr-1" />
              Room Types
            </span>
            <span className="font-medium text-green-400">{Object.keys(roomStats).length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Total Capacity
            </span>
            <span className="font-medium text-purple-400">
              {geoJson.features.reduce((sum, f) => sum + (parseInt(f.properties.items?.[0] || "0") || 0), 0)}
            </span>
          </div>
        </div>
      </div>

      {hoveredRoom && (
        <div className="absolute bottom-4 left-4 bg-gray-800/95 backdrop-blur-lg rounded-lg shadow-md p-3 z-10">
          <p className="text-sm font-medium text-gray-200">Hovered: {hoveredRoom}</p>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full cursor-move" style={{ touchAction: "none" }} />
    </div>
  );
};

export default OfficeFloorPlan