/* Original fictional designs; research mapping lives in docs/vehicle-sources.md. */
const CATALOG = [
  {
    "id": "retro-01",
    "name": "Bavaria K30",
    "series": [
      "DTM",
      "BTCC"
    ],
    "era": 1990,
    "shape": "coupe",
    "color": "#29d8de",
    "accent": "#f4f0dc",
    "number": "01",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.82,
    "tail": 0.83,
    "description": "Zwei Türen. Lange Motorhaube."
  },
  {
    "id": "retro-02",
    "name": "Neckar S19",
    "series": [
      "DTM"
    ],
    "era": 1990,
    "shape": "box",
    "color": "#f24690",
    "accent": "#17262c",
    "number": "02",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.865,
    "tail": 0.856,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-03",
    "name": "Neckar S19 Evolution",
    "series": [
      "DTM"
    ],
    "era": 1990,
    "shape": "box",
    "color": "#f8dc62",
    "accent": "#eddd4c",
    "number": "03",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.91,
    "tail": 0.882,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-04",
    "name": "Neckar S19 Aero",
    "series": [
      "DTM"
    ],
    "era": 1991,
    "shape": "aero",
    "color": "#9e91ff",
    "accent": "#f4f0dc",
    "number": "04",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.955,
    "tail": 0.908,
    "description": "Breite Schultern. Markanter Heckflügel."
  },
  {
    "id": "retro-05",
    "name": "Neckar S19 Klasse 1",
    "series": [
      "DTM"
    ],
    "era": 1993,
    "shape": "aero",
    "color": "#f8f2da",
    "accent": "#17262c",
    "number": "05",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.82,
    "tail": 0.934,
    "description": "Breite Schultern. Markanter Heckflügel."
  },
  {
    "id": "retro-06",
    "name": "Donau Eight",
    "series": [
      "DTM"
    ],
    "era": 1991,
    "shape": "long",
    "color": "#c4cbd6",
    "accent": "#eddd4c",
    "number": "06",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.865,
    "tail": 0.96,
    "description": "Langer Radstand. Souveräner Auftritt."
  },
  {
    "id": "retro-07",
    "name": "Prairie Fox",
    "series": [
      "DTM"
    ],
    "era": 1991,
    "shape": "muscle",
    "color": "#f27b43",
    "accent": "#f4f0dc",
    "number": "07",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.91,
    "tail": 0.83,
    "description": "Breite Spur. Amerikanischer Charakter."
  },
  {
    "id": "retro-08",
    "name": "Rhein Sprint",
    "series": [
      "DTM"
    ],
    "era": 1990,
    "shape": "hatch",
    "color": "#f5d04b",
    "accent": "#17262c",
    "number": "08",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.955,
    "tail": 0.856,
    "description": "Kurzes Heck. Kompakte Silhouette."
  },
  {
    "id": "retro-09",
    "name": "Rhein Senator",
    "series": [
      "DTM"
    ],
    "era": 1990,
    "shape": "long",
    "color": "#7eb9f4",
    "accent": "#eddd4c",
    "number": "09",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.82,
    "tail": 0.882,
    "description": "Langer Radstand. Souveräner Auftritt."
  },
  {
    "id": "retro-10",
    "name": "Rhein Senator Evolution",
    "series": [
      "DTM"
    ],
    "era": 1991,
    "shape": "aero",
    "color": "#a091e8",
    "accent": "#f4f0dc",
    "number": "10",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.865,
    "tail": 0.908,
    "description": "Breite Schultern. Markanter Heckflügel."
  },
  {
    "id": "retro-11",
    "name": "Hikari Comet",
    "series": [
      "DTM"
    ],
    "era": 1990,
    "shape": "gt",
    "color": "#e94d69",
    "accent": "#17262c",
    "number": "11",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.91,
    "tail": 0.934,
    "description": "Flache Haube. Breites Heck."
  },
  {
    "id": "retro-12",
    "name": "Rhein Meteor",
    "series": [
      "DTM"
    ],
    "era": 1993,
    "shape": "hatch",
    "color": "#ecaa39",
    "accent": "#eddd4c",
    "number": "12",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.955,
    "tail": 0.96,
    "description": "Kurzes Heck. Kompakte Silhouette."
  },
  {
    "id": "retro-13",
    "name": "Rhein Arrow V6",
    "series": [
      "DTM",
      "ITC"
    ],
    "era": 1994,
    "shape": "gt",
    "color": "#f2dd39",
    "accent": "#f4f0dc",
    "number": "13",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.82,
    "tail": 0.83,
    "description": "Flache Haube. Breites Heck."
  },
  {
    "id": "retro-14",
    "name": "Milano Rosso V6",
    "series": [
      "DTM",
      "ITC"
    ],
    "era": 1993,
    "shape": "aero",
    "color": "#ef494a",
    "accent": "#17262c",
    "number": "14",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.865,
    "tail": 0.856,
    "description": "Breite Schultern. Markanter Heckflügel."
  },
  {
    "id": "retro-15",
    "name": "Neckar Corsa V6",
    "series": [
      "DTM",
      "ITC"
    ],
    "era": 1994,
    "shape": "aero",
    "color": "#91d6ba",
    "accent": "#eddd4c",
    "number": "15",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.91,
    "tail": 0.882,
    "description": "Breite Schultern. Markanter Heckflügel."
  },
  {
    "id": "retro-16",
    "name": "Bavaria K36 Club",
    "series": [
      "DTM"
    ],
    "era": 1994,
    "shape": "coupe",
    "color": "#c4cbd6",
    "accent": "#f4f0dc",
    "number": "16",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.955,
    "tail": 0.908,
    "description": "Zwei Türen. Lange Motorhaube."
  },
  {
    "id": "retro-17",
    "name": "Albion Storm RS",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "fastback",
    "color": "#279ad5",
    "accent": "#17262c",
    "number": "17",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.82,
    "tail": 0.934,
    "description": "Fließende Dachlinie. Sportliches Heck."
  },
  {
    "id": "retro-18",
    "name": "Albion Storm Saloon",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "sedan",
    "color": "#cb8ee9",
    "accent": "#eddd4c",
    "number": "18",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.865,
    "tail": 0.96,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-19",
    "name": "Britannia Cavalry",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "sedan",
    "color": "#ef6550",
    "accent": "#f4f0dc",
    "number": "19",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.91,
    "tail": 0.83,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-20",
    "name": "Bavaria K30 Light",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "box",
    "color": "#dfdbb8",
    "accent": "#17262c",
    "number": "20",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.955,
    "tail": 0.856,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-21",
    "name": "Britannia Belmont GT",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "box",
    "color": "#79c7bd",
    "accent": "#eddd4c",
    "number": "21",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.82,
    "tail": 0.882,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-22",
    "name": "Katsura Star",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "gt",
    "color": "#c45d84",
    "accent": "#f4f0dc",
    "number": "22",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.865,
    "tail": 0.908,
    "description": "Flache Haube. Breites Heck."
  },
  {
    "id": "retro-23",
    "name": "Hinode Pocket",
    "series": [
      "BTCC"
    ],
    "era": 1990,
    "shape": "hatch",
    "color": "#eff0dd",
    "accent": "#17262c",
    "number": "23",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.91,
    "tail": 0.934,
    "description": "Kurzes Heck. Kompakte Silhouette."
  },
  {
    "id": "retro-24",
    "name": "Hikari Crest",
    "series": [
      "BTCC"
    ],
    "era": 1991,
    "shape": "box",
    "color": "#5ebc93",
    "accent": "#eddd4c",
    "number": "24",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.955,
    "tail": 0.96,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-25",
    "name": "Katsura Lance",
    "series": [
      "BTCC"
    ],
    "era": 1991,
    "shape": "box",
    "color": "#d9bd55",
    "accent": "#f4f0dc",
    "number": "25",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.82,
    "tail": 0.83,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-26",
    "name": "Katsura Grand",
    "series": [
      "BTCC"
    ],
    "era": 1991,
    "shape": "long",
    "color": "#7e96b9",
    "accent": "#17262c",
    "number": "26",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.865,
    "tail": 0.856,
    "description": "Langer Radstand. Souveräner Auftritt."
  },
  {
    "id": "retro-27",
    "name": "Seika Prime I",
    "series": [
      "BTCC"
    ],
    "era": 1991,
    "shape": "sedan",
    "color": "#78b566",
    "accent": "#eddd4c",
    "number": "27",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.91,
    "tail": 0.882,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-28",
    "name": "Lionne Quatre",
    "series": [
      "BTCC"
    ],
    "era": 1991,
    "shape": "box",
    "color": "#a5c8dc",
    "accent": "#f4f0dc",
    "number": "28",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.955,
    "tail": 0.908,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-29",
    "name": "Bavaria K36 Coupe",
    "series": [
      "BTCC"
    ],
    "era": 1992,
    "shape": "coupe",
    "color": "#b37ccc",
    "accent": "#17262c",
    "number": "29",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.82,
    "tail": 0.934,
    "description": "Zwei Türen. Lange Motorhaube."
  },
  {
    "id": "retro-30",
    "name": "Bavaria K36 Touring",
    "series": [
      "BTCC"
    ],
    "era": 1993,
    "shape": "sedan",
    "color": "#73a8da",
    "accent": "#eddd4c",
    "number": "30",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.865,
    "tail": 0.96,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-31",
    "name": "Aozora Flash",
    "series": [
      "BTCC"
    ],
    "era": 1992,
    "shape": "fastback",
    "color": "#d54f74",
    "accent": "#f4f0dc",
    "number": "31",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.91,
    "tail": 0.83,
    "description": "Fließende Dachlinie. Sportliches Heck."
  },
  {
    "id": "retro-32",
    "name": "Hikari Crest II",
    "series": [
      "BTCC"
    ],
    "era": 1993,
    "shape": "sedan",
    "color": "#d8e1c4",
    "accent": "#17262c",
    "number": "32",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.955,
    "tail": 0.856,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-33",
    "name": "Albion Globe I",
    "series": [
      "BTCC"
    ],
    "era": 1993,
    "shape": "round",
    "color": "#4aa7d7",
    "accent": "#eddd4c",
    "number": "33",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.82,
    "tail": 0.882,
    "description": "Runde Formen. Späte Tourenwagen-Ära."
  },
  {
    "id": "retro-34",
    "name": "Albion Globe II",
    "series": [
      "BTCC"
    ],
    "era": 1997,
    "shape": "round",
    "color": "#a3bd55",
    "accent": "#f4f0dc",
    "number": "34",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.865,
    "tail": 0.908,
    "description": "Runde Formen. Späte Tourenwagen-Ära."
  },
  {
    "id": "retro-35",
    "name": "Rivage Nineteen",
    "series": [
      "BTCC"
    ],
    "era": 1993,
    "shape": "hatch",
    "color": "#e3bc37",
    "accent": "#17262c",
    "number": "35",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.91,
    "tail": 0.934,
    "description": "Kurzes Heck. Kompakte Silhouette."
  },
  {
    "id": "retro-36",
    "name": "Aozora Silk Six",
    "series": [
      "BTCC"
    ],
    "era": 1993,
    "shape": "round",
    "color": "#b87fbb",
    "accent": "#eddd4c",
    "number": "36",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.955,
    "tail": 0.96,
    "description": "Runde Formen. Späte Tourenwagen-Ära."
  },
  {
    "id": "retro-37",
    "name": "Rivage Lagoon",
    "series": [
      "BTCC"
    ],
    "era": 1994,
    "shape": "fastback",
    "color": "#63b5c6",
    "accent": "#f4f0dc",
    "number": "37",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.82,
    "tail": 0.83,
    "description": "Fließende Dachlinie. Sportliches Heck."
  },
  {
    "id": "retro-38",
    "name": "Nordvik Estate",
    "series": [
      "BTCC"
    ],
    "era": 1994,
    "shape": "wagon",
    "color": "#d9e6ee",
    "accent": "#17262c",
    "number": "38",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.865,
    "tail": 0.856,
    "description": "Langes Dach. Unverwechselbarer Auftritt."
  },
  {
    "id": "retro-39",
    "name": "Milano Rosso Twin",
    "series": [
      "DTM",
      "BTCC"
    ],
    "era": 1994,
    "shape": "box",
    "color": "#ee7046",
    "accent": "#eddd4c",
    "number": "39",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.91,
    "tail": 0.882,
    "description": "Klare Kanten. Klassischer Tourenwagen."
  },
  {
    "id": "retro-40",
    "name": "Nordvik Eight",
    "series": [
      "BTCC"
    ],
    "era": 1995,
    "shape": "long",
    "color": "#72abc7",
    "accent": "#f4f0dc",
    "number": "40",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.955,
    "tail": 0.908,
    "description": "Langer Radstand. Souveräner Auftritt."
  },
  {
    "id": "retro-41",
    "name": "Hinode Harmony I",
    "series": [
      "BTCC"
    ],
    "era": 1995,
    "shape": "round",
    "color": "#d4d9de",
    "accent": "#17262c",
    "number": "41",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.82,
    "tail": 0.934,
    "description": "Runde Formen. Späte Tourenwagen-Ära."
  },
  {
    "id": "retro-42",
    "name": "Hinode Harmony II",
    "series": [
      "BTCC"
    ],
    "era": 1999,
    "shape": "sedan",
    "color": "#e3be4a",
    "accent": "#eddd4c",
    "number": "42",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.865,
    "tail": 0.96,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-43",
    "name": "Britannia Vector",
    "series": [
      "BTCC"
    ],
    "era": 1996,
    "shape": "round",
    "color": "#cf594d",
    "accent": "#f4f0dc",
    "number": "43",
    "livery": 2,
    "roof": 1.0,
    "nose": 0.91,
    "tail": 0.83,
    "description": "Runde Formen. Späte Tourenwagen-Ära."
  },
  {
    "id": "retro-44",
    "name": "Lionne Six",
    "series": [
      "BTCC"
    ],
    "era": 1996,
    "shape": "sedan",
    "color": "#d4c549",
    "accent": "#17262c",
    "number": "44",
    "livery": 3,
    "roof": 1.04,
    "nose": 0.955,
    "tail": 0.856,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-45",
    "name": "Donau Four",
    "series": [
      "BTCC"
    ],
    "era": 1996,
    "shape": "round",
    "color": "#a5becb",
    "accent": "#eddd4c",
    "number": "45",
    "livery": 4,
    "roof": 1.08,
    "nose": 0.82,
    "tail": 0.882,
    "description": "Runde Formen. Späte Tourenwagen-Ära."
  },
  {
    "id": "retro-46",
    "name": "Seika Prime II",
    "series": [
      "BTCC"
    ],
    "era": 1997,
    "shape": "sedan",
    "color": "#3dafa1",
    "accent": "#f4f0dc",
    "number": "46",
    "livery": 0,
    "roof": 0.92,
    "nose": 0.865,
    "tail": 0.908,
    "description": "Vier Türen. Rennsport der Neunziger."
  },
  {
    "id": "retro-47",
    "name": "Nordvik Forty",
    "series": [
      "BTCC"
    ],
    "era": 1997,
    "shape": "sedan",
    "color": "#91bde1",
    "accent": "#17262c",
    "number": "47",
    "livery": 1,
    "roof": 0.96,
    "nose": 0.91,
    "tail": 0.934,
    "description": "Vier Türen. Rennsport der Neunziger."
  }
];
