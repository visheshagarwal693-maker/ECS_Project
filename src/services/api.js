const API_BASE_URL = "http://localhost:8000";

export async function getDetections() {
  const response = await fetch(`${API_BASE_URL}/detections`);

  if (!response.ok) {
    throw new Error("Failed to fetch detections");
  }

  return response.json();
}

export async function getAnalytics() {
  const response = await fetch(`${API_BASE_URL}/analytics`);

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
}

export async function getHotspots() {
  const response = await fetch(`${API_BASE_URL}/hotspots`);

  if (!response.ok) {
    throw new Error("Failed to fetch hotspots");
  }

  return response.json();
}

export async function getRoutes() {
  const response = await fetch(`${API_BASE_URL}/routes`);

  if (!response.ok) {
    throw new Error("Failed to fetch routes");
  }

  return response.json();
}