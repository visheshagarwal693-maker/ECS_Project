// ==========================================
// SMART WASTE AI - FRONTEND MOCK DATA
// ==========================================


// ==========================================
// 1. AI DETECTIONS
// ==========================================

export const detections = [
  {
    id: 1,
    litter_type: "Plastic Container",
    detection_count: 1,
    confidence: 0.917,
    footfall: 85,
    priority_score: 78,
    collection_time: 24,
    timestamp: "2026-09-18T10:42:30",
    status: "New",
    location: "Monitoring Point A",
  },

  {
    id: 2,
    litter_type: "Wrapper",
    detection_count: 1,
    confidence: 0.874,
    footfall: 71,
    priority_score: 68,
    collection_time: 31,
    timestamp: "2026-09-18T10:41:10",
    status: "Updated",
    location: "Monitoring Point D",
  },

  {
    id: 3,
    litter_type: "Can",
    detection_count: 1,
    confidence: 0.942,
    footfall: 54,
    priority_score: 48,
    collection_time: 42,
    timestamp: "2026-09-18T10:40:20",
    status: "Updated",
    location: "Monitoring Point B",
  },

  {
    id: 4,
    litter_type: "Plastic Bag",
    detection_count: 2,
    confidence: 0.861,
    footfall: 42,
    priority_score: 32,
    collection_time: 55,
    timestamp: "2026-09-18T10:39:05",
    status: "New",
    location: "Monitoring Point C",
  },

  {
    id: 5,
    litter_type: "Paper",
    detection_count: 1,
    confidence: 0.961,
    footfall: 38,
    priority_score: 27,
    collection_time: 61,
    timestamp: "2026-09-18T10:37:21",
    status: "Collected",
    location: "Monitoring Point C",
  },
];


// ==========================================
// 2. DETECTION TREND
// ==========================================

export const detectionTrend = [
  {
    time: "08:00",
    detections: 12,
  },

  {
    time: "09:00",
    detections: 18,
  },

  {
    time: "10:00",
    detections: 31,
  },

  {
    time: "11:00",
    detections: 27,
  },

  {
    time: "12:00",
    detections: 42,
  },

  {
    time: "13:00",
    detections: 35,
  },

  {
    time: "14:00",
    detections: 49,
  },
];


// ==========================================
// 3. LITTER CLASS DISTRIBUTION
// ==========================================

export const classDistribution = [
  {
    name: "Plastic Container",
    count: 126,
  },

  {
    name: "Wrapper",
    count: 94,
  },

  {
    name: "Can",
    count: 72,
  },

  {
    name: "Plastic Bag",
    count: 61,
  },

  {
    name: "Paper",
    count: 48,
  },

  {
    name: "Other",
    count: 33,
  },
];


// ==========================================
// 4. CONFIDENCE DISTRIBUTION
// ==========================================

export const confidenceDistribution = [
  {
    range: "0.50–0.59",
    count: 8,
  },

  {
    range: "0.60–0.69",
    count: 17,
  },

  {
    range: "0.70–0.79",
    count: 35,
  },

  {
    range: "0.80–0.89",
    count: 74,
  },

  {
    range: "0.90–1.00",
    count: 118,
  },
];


// ==========================================
// 5. PRIORITY DISTRIBUTION
// ==========================================

export const priorityDistribution = [
  {
    name: "High",
    count: 126,
  },

  {
    name: "Medium",
    count: 384,
  },

  {
    name: "Low",
    count: 738,
  },
];


// ==========================================
// 6. HOTSPOTS
// ==========================================

export const hotspots = [
  {
    id: 1,
    name: "Monitoring Point A",
    latitude: 16.490,
    longitude: 80.500,
    count: 82,
    priority: "High",
    lastDetected: "5 min ago",
  },

  {
    id: 2,
    name: "Monitoring Point D",
    latitude: 16.491,
    longitude: 80.502,
    count: 67,
    priority: "High",
    lastDetected: "8 min ago",
  },

  {
    id: 3,
    name: "Monitoring Point B",
    latitude: 16.488,
    longitude: 80.498,
    count: 47,
    priority: "Medium",
    lastDetected: "12 min ago",
  },

  {
    id: 4,
    name: "Monitoring Point C",
    latitude: 16.487,
    longitude: 80.501,
    count: 21,
    priority: "Low",
    lastDetected: "18 min ago",
  },
];


// ==========================================
// 7. COLLECTION QUEUE
// ==========================================

export const queueTasks = [
  {
    id: 1,
    priority: "High",
    litterType: "Plastic Container",
    count: 18,
    location: "Point A",
    status: "Detected",
  },

  {
    id: 2,
    priority: "High",
    litterType: "Wrapper",
    count: 14,
    location: "Point D",
    status: "Assigned",
  },

  {
    id: 3,
    priority: "Medium",
    litterType: "Can",
    count: 11,
    location: "Point B",
    status: "Prioritized",
  },

  {
    id: 4,
    priority: "Low",
    litterType: "Plastic Bag",
    count: 6,
    location: "Point C",
    status: "Collected",
  },
];


// ==========================================
// 8. SYSTEM STATUS
// ==========================================

export const systemStatus = {
  backend: "Online",
  camera: "Online",
  ai: "Running",

  model: "YOLO11s",

  classes: 6,

  captureInterval: 10,

  cameraHeight: 2.5,

  confidenceThreshold: 0.50,
};