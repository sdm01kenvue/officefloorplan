"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
// @ts-ignore
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
import geoJsonData from "./zones.geojson";

type Feature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { type: string; name: string; items?: string[]; zone?: string };
};

type GeoJSON = {
  type: "FeatureCollection";
  features: Feature[];
};

const geoJson: GeoJSON = 

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

export default OfficeFloorPlan;