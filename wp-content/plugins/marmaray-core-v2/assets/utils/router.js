import { TRANSIT_GRAPH, NODE_ALIASES } from '../data/istanbulTransitGraph';
import { ISTANBUL_DISTRICTS } from '../data/istanbulDistricts';

// Helper to resolve alias names
const resolveNode = (name) => {
  if (!name) return '';
  return NODE_ALIASES[name] || name;
};

// Robust Dijkstra Algorithm Engine with Full Segment Breakdown
export const calculateRoute = async (startStationName, districtId, modeOverride = "fastest", specificTargetNode = "", t = (k, opts) => k) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const district = ISTANBUL_DISTRICTS.find(d => d.id === districtId);
        if (!district) {
          resolve({ error: t("router_err_district") });
          return;
        }

        const start = resolveNode(startStationName);
        if (!start || !TRANSIT_GRAPH[start]) {
          resolve({ error: t("router_err_station") });
          return;
        }

        // Target nodes for the district / specific location
        const targetNodes = specificTargetNode 
          ? [resolveNode(specificTargetNode)]
          : district.nodes.map(n => resolveNode(n)).filter(Boolean);

        // Check if origin station is already in the target node
        if (targetNodes.includes(start)) {
          resolve({
            info: t("router_info_same"),
            hasDirectRail: district.hasDirectRail
          });
          return;
        }

        let bestPath = null;
        let bestCost = Infinity;
        let bestTarget = null;

        for (const rawTarget of targetNodes) {
          const target = resolveNode(rawTarget);
          if (!target || !TRANSIT_GRAPH[target]) continue;

          const distances = {};
          const previous = {};
          const edgeTaken = {};
          const nodes = new Set();

          for (const node in TRANSIT_GRAPH) {
            distances[node] = Infinity;
            previous[node] = null;
            nodes.add(node);
          }
          distances[start] = 0;

          while (nodes.size > 0) {
            let minNode = null;
            for (const n of nodes) {
              if (minNode === null || distances[n] < distances[minNode]) {
                minNode = n;
              }
            }

            if (minNode === null || distances[minNode] === Infinity) break;
            if (minNode === target) break;

            nodes.delete(minNode);

            const neighbors = TRANSIT_GRAPH[minNode] || [];
            for (const edge of neighbors) {
              if (!nodes.has(edge.target)) continue;

              const prevEdge = edgeTaken[minNode];
              const isTransfer = prevEdge && prevEdge.line !== edge.line && edge.vehicleType !== 'walk';
              
              // Balanced travel cost (Duration + 5 min transfer penalty)
              const weight = edge.durationMin + (isTransfer ? 5 : 0);
              const alt = distances[minNode] + weight;

              if (alt < distances[edge.target]) {
                distances[edge.target] = alt;
                previous[edge.target] = minNode;
                edgeTaken[edge.target] = edge;
              }
            }
          }

          if (distances[target] < bestCost) {
            bestCost = distances[target];
            bestTarget = target;

            const path = [];
            let curr = target;
            while (curr && previous[curr]) {
              path.unshift({
                from: previous[curr],
                to: curr,
                edge: edgeTaken[curr]
              });
              curr = previous[curr];
            }
            bestPath = path;
          }
        }

        if (!bestPath || bestPath.length === 0) {
          resolve({
            info: t("router_err_no_route"),
            hasDirectRail: district.hasDirectRail,
            note: district.note
          });
          return;
        }

        // Group path into detailed travel segments
        const segments = [];
        let currentSeg = null;

        for (const step of bestPath) {
          const { from, to, edge } = step;
          if (!currentSeg || currentSeg.line !== edge.line) {
            if (currentSeg) segments.push(currentSeg);
            currentSeg = {
              from: from,
              to: to,
              line: edge.line,
              vehicleType: edge.vehicleType,
              distanceKm: edge.distanceKm,
              durationMin: edge.durationMin,
              stops: [to]
            };
          } else {
            currentSeg.to = to;
            currentSeg.distanceKm += edge.distanceKm;
            currentSeg.durationMin += edge.durationMin;
            currentSeg.stops.push(to);
          }
        }
        if (currentSeg) segments.push(currentSeg);

        // Compute totals
        let totalDistance = 0;
        let totalDuration = 0;
        let transferCount = 0;

        const formattedSteps = segments.map((seg, idx) => {
          totalDistance += seg.distanceKm;
          totalDuration += seg.durationMin;
          if (seg.vehicleType === 'walk' || (idx > 0 && segments[idx - 1].line !== seg.line)) {
            transferCount++;
          }

          const stopCount = seg.stops.length;
          const intermediateList = stopCount > 1 
            ? seg.stops.slice(0, -1).join(', ') 
            : null;

          let description = '';
          if (seg.vehicleType === 'walk') {
            description = `${seg.from} durağından ${seg.to} durağına aktarma yürüyüşü yapın.`;
          } else {
            description = `${seg.line} hattını kullanarak ${seg.from} durağından biniş yapın, ${seg.to} durağında inin. (${stopCount} durak)`;
          }

          return {
            id: idx,
            vehicleType: seg.vehicleType,
            line: seg.line,
            from: seg.from,
            to: seg.to,
            stopCount: stopCount,
            intermediateList: intermediateList,
            durationMin: Math.round(seg.durationMin),
            distanceKm: parseFloat(seg.distanceKm.toFixed(1)),
            description: description
          };
        });

        resolve({
          origin: startStationName,
          districtName: district.name,
          targetNode: bestTarget,
          hasDirectRail: district.hasDirectRail,
          note: district.note,
          totalDurationMin: Math.round(totalDuration),
          totalDistanceKm: parseFloat(totalDistance.toFixed(1)),
          transferCount: Math.max(0, transferCount - 1),
          steps: formattedSteps
        });

      } catch (err) {
        console.error('Route calculation error:', err);
        resolve({
          error: t("router_err_unexpected")
        });
      }
    }, 30);
  });
};
