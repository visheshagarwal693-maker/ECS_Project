/* =========================================================
   CAMERA DATA
   ========================================================= */

export const cameras = [

  {
    id: "A",
    name: "Camera A",
    location: "Zone A",

    /* Priority controls the camera colour */
    priority: "High",

    detections: 42,

    status: "Online",
  },

  {
    id: "B",
    name: "Camera B",
    location: "Zone B",

    priority: "Medium",

    detections: 31,

    status: "Online",
  },

  {
    id: "C",
    name: "Camera C",
    location: "Zone C",

    priority: "Medium",

    detections: 28,

    status: "Online",
  },

  {
    id: "D",
    name: "Camera D",
    location: "Zone D",

    priority: "Low",

    detections: 25,

    status: "Online",
  },

];


/* =========================================================
   ANALYTICS DATA FOR EACH CAMERA
   ========================================================= */

export const cameraAnalytics = {

  A: {

    totalDetections: 42,

    averageConfidence: 91.2,

    highPriority: 8,

    detectionTrend: [

      {
        time: "08:00",
        detections: 5,
      },

      {
        time: "09:00",
        detections: 8,
      },

      {
        time: "10:00",
        detections: 6,
      },

      {
        time: "11:00",
        detections: 10,
      },

      {
        time: "12:00",
        detections: 7,
      },

      {
        time: "13:00",
        detections: 6,
      },

    ],

    classDistribution: [

      {
        name: "Plastic",
        count: 12,
      },

      {
        name: "Paper",
        count: 8,
      },

      {
        name: "Glass",
        count: 6,
      },

      {
        name: "Metal",
        count: 7,
      },

      {
        name: "Organic",
        count: 5,
      },

      {
        name: "Other",
        count: 4,
      },

    ],

    confidenceDistribution: [

      {
        range: "90–100%",
        count: 20,
      },

      {
        range: "80–89%",
        count: 12,
      },

      {
        range: "70–79%",
        count: 7,
      },

      {
        range: "Below 70%",
        count: 3,
      },

    ],

  },


  B: {

    totalDetections: 31,

    averageConfidence: 87.8,

    highPriority: 6,

    detectionTrend: [

      {
        time: "08:00",
        detections: 4,
      },

      {
        time: "09:00",
        detections: 5,
      },

      {
        time: "10:00",
        detections: 7,
      },

      {
        time: "11:00",
        detections: 4,
      },

      {
        time: "12:00",
        detections: 6,
      },

      {
        time: "13:00",
        detections: 5,
      },

    ],

    classDistribution: [

      {
        name: "Plastic",
        count: 9,
      },

      {
        name: "Paper",
        count: 6,
      },

      {
        name: "Glass",
        count: 4,
      },

      {
        name: "Metal",
        count: 5,
      },

      {
        name: "Organic",
        count: 4,
      },

      {
        name: "Other",
        count: 3,
      },

    ],

    confidenceDistribution: [

      {
        range: "90–100%",
        count: 12,
      },

      {
        range: "80–89%",
        count: 10,
      },

      {
        range: "70–79%",
        count: 6,
      },

      {
        range: "Below 70%",
        count: 3,
      },

    ],

  },


  C: {

    totalDetections: 28,

    averageConfidence: 85.6,

    highPriority: 5,

    detectionTrend: [

      {
        time: "08:00",
        detections: 3,
      },

      {
        time: "09:00",
        detections: 6,
      },

      {
        time: "10:00",
        detections: 5,
      },

      {
        time: "11:00",
        detections: 4,
      },

      {
        time: "12:00",
        detections: 5,
      },

      {
        time: "13:00",
        detections: 5,
      },

    ],

    classDistribution: [

      {
        name: "Plastic",
        count: 8,
      },

      {
        name: "Paper",
        count: 5,
      },

      {
        name: "Glass",
        count: 4,
      },

      {
        name: "Metal",
        count: 4,
      },

      {
        name: "Organic",
        count: 4,
      },

      {
        name: "Other",
        count: 3,
      },

    ],

    confidenceDistribution: [

      {
        range: "90–100%",
        count: 9,
      },

      {
        range: "80–89%",
        count: 10,
      },

      {
        range: "70–79%",
        count: 6,
      },

      {
        range: "Below 70%",
        count: 3,
      },

    ],

  },


  D: {

    totalDetections: 25,

    averageConfidence: 82.9,

    highPriority: 4,

    detectionTrend: [

      {
        time: "08:00",
        detections: 4,
      },

      {
        time: "09:00",
        detections: 3,
      },

      {
        time: "10:00",
        detections: 5,
      },

      {
        time: "11:00",
        detections: 4,
      },

      {
        time: "12:00",
        detections: 5,
      },

      {
        time: "13:00",
        detections: 4,
      },

    ],

    classDistribution: [

      {
        name: "Plastic",
        count: 7,
      },

      {
        name: "Paper",
        count: 4,
      },

      {
        name: "Glass",
        count: 3,
      },

      {
        name: "Metal",
        count: 4,
      },

      {
        name: "Organic",
        count: 4,
      },

      {
        name: "Other",
        count: 3,
      },

    ],

    confidenceDistribution: [

      {
        range: "90–100%",
        count: 7,
      },

      {
        range: "80–89%",
        count: 9,
      },

      {
        range: "70–79%",
        count: 6,
      },

      {
        range: "Below 70%",
        count: 3,
      },

    ],

  },

};