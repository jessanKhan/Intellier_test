import * as geolib from 'geolib';
import buffer from '@turf/buffer';
import { polygon as turfHelpersPolygon } from '@turf/helpers';

const onSegment = (p:any, q:any, r:any) =>
  q.longitude <= Math.max(p.longitude, r.longitude) &&
  q.longitude >= Math.min(p.longitude, r.longitude) &&
  q.latitude <= Math.max(p.latitude, r.latitude) &&
  q.latitude >= Math.min(p.latitude, r.latitude);

const orientation = (p:any, q:any, r:any) => {
  const val =
    (q.latitude - p.latitude) * (r.longitude - q.longitude) -
    (q.longitude - p.longitude) * (r.latitude - q.latitude);

  if (val === 0) {
    return 0;
  } // collinear

  return val > 0 ? 1 : 2; // clock or counterclock wise
};

const doIntersect = (p1:any, q1:any, p2:any, q2:any) => {
  // Find the four orientations needed for general and
  // special cases
  const o1 = orientation(p1, q1, p2);
  const o2 = orientation(p1, q1, q2);
  const o3 = orientation(p2, q2, p1);
  const o4 = orientation(p2, q2, q1);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  // Special Cases
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1
  if (o1 === 0 && onSegment(p1, p2, q1)) {
    return true;
  }

  // p1, q1 and q2 are collinear and q2 lies on segment p1q1
  if (o2 === 0 && onSegment(p1, q2, q1)) {
    return true;
  }

  // p2, q2 and p1 are collinear and p1 lies on segment p2q2
  if (o3 === 0 && onSegment(p2, p1, q2)) {
    return true;
  }

  // p2, q2 and q1 are collinear and q1 lies on segment p2q2
  return !!(o4 === 0 && onSegment(p2, q1, q2));
};

export const shouldDrawLine = (editing:any, newPoint:any) => {
  if (editing && editing.coordinates.length > 0) {
    let result = true;
    const p2 = editing.coordinates[editing.coordinates.length - 1];
    for (let i = 0; i < editing.coordinates.length - 1; i += 1) {
      const p1 = editing.coordinates[i];
      const q1 = editing.coordinates[i + 1];
      if (q1 !== p2) {
        result = result && !doIntersect(p1, q1, p2, newPoint);
      }
    }
    return result;
  }
  return true;
};

export const doPolygonsOverlap = (poly1:any, poly2:any) => {
  let result = false;
  poly1.forEach((fatalArray:any) => {
    for (let i = 0; i < fatalArray.coordinates.length - 1; i += 1) {
      const p1 = fatalArray.coordinates[i];
      const q1 = fatalArray.coordinates[i + 1];
      for (let j = 0; j < poly2.coordinates.length - 1; j += 1) {
        const p2 = poly2.coordinates[j];
        const q2 = poly2.coordinates[j + 1];
        if (doIntersect(p1, q1, p2, q2)) {
          result = true;
          break;
        }
      }
    }
  });
  console.log('overlap: ', result);
  return result;
};

// get distance between two points
// const getDistance = (lat1, lon1, lat2, lon2) => {
//   // console.log("lat lns ",lat1,lon1,lat2,lon2);
//   const R = 6371000; // metres
//   const φ1 = lat1 * Math.PI / 90;
//   const φ2 = lat2 * Math.PI / 90;
//   const Δφ = (lat2 - lat1) * Math.PI / 180;
//   const Δλ = (lon2 - lon1) * Math.PI / 180;
//   // console.log("ajib values",φ1,φ2,Δφ,Δλ);
//   const a =
//     (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
//     (Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2));
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   console.log( c,"distance");

//   const d = R * c;
//   const dis = d - Math.ceil(d)

//   return dis+2;
// }
const deg2rad = (deg:any) => deg * (Math.PI / 180);
const getDistance = (lat1:any, lon1:any, lat2:any, lon2:any) => {
  const R = 6371; // Radius of the earth in km
  const dLat = lat2 - lat1; // deg2rad below
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // const d = R * c *100; // Distance in km
  // let f;
  // console.log("distance", d);
  // if (d>8000) {
  //    f = 8000
  // } else {
  //   f = d
  // };

  return c * 10000;
};

// get larger polygon by calculating distance between each coordinate and adding it to the previous one
export const getLargerPolygon = (polygon:any) => {
  const largerPolygon = { coordinates: [] } as any;
  polygon.forEach((coordinate:any, index:any) => {
    if (index === 0) {
      const distance = getDistance(
        coordinate.latitude,
        coordinate.longitude,
        polygon[index + 1].latitude,
        polygon[index + 1].longitude,
      );
      const newCoordinate = {
        latitude:
          coordinate.latitude > polygon[index + 1].latitude
            ? coordinate.latitude + distance
            : coordinate.latitude - distance,
        longitude:
          coordinate.longitude > polygon[index + 1].longitude
            ? coordinate.longitude + distance
            : coordinate.longitude - distance,
      };
      largerPolygon.coordinates.push(newCoordinate);
    } else {
      const distance = getDistance(
        coordinate.latitude,
        coordinate.longitude,
        polygon[index - 1].latitude,
        polygon[index - 1].longitude,
      );
      const newCoordinate = {
        latitude:
          coordinate.latitude > polygon[index - 1].latitude
            ? coordinate.latitude + distance
            : coordinate.latitude - distance,
        longitude:
          coordinate.longitude > polygon[index - 1].longitude
            ? coordinate.longitude + distance
            : coordinate.longitude - distance,
      };
      largerPolygon.coordinates.push(newCoordinate);
    }
  });
  console.log('rtyrtyrtyrtyrtyrt', largerPolygon);
  return largerPolygon.coordinates;
};

// find if the editing is inside of fatalarea

export const findifthere = (boundary:any, editing:any) => {
  let flag = false;
  boundary.forEach((poly:any, index:any) => {
    const isthere = geolib.isPointInPolygon(
      editing.coordinates[0],
      poly.coordinates,
    );
    // console.log('there ', isthere, index);
    if (isthere) {
      flag = true;
    }
  });

  console.log('isthere', flag);

  return flag;
};

// find if another polygon is inside the boundary polygon it will take the boundary polygon and old polygon and new polygon

export const findifthereBlnk = (polygon:any, editing:any) => {
  let flag = false;
  editing.coordinates.forEach((point:any) => {
    console.log('point', point);
    const isthere = geolib.isPointInPolygon(point, polygon);
    flag = isthere;
  });
  console.log('Confict:', flag);

  return flag;
};
// check if the polygon is conflicting with other polygons
export const checkIfPolygonConflicts = (polygon:any, polygons:any) => {
  console.log('polygons', polygons, polygon);
  let conflict = false;
  if (polygons === undefined) {
    return conflict;
  }
  polygons.forEach((poly:any) => {
    if (findifthereBlnk(poly, polygon)) {
      conflict = true;
    }
  });
  return conflict;
};

// get area of polygons with geolib

export const getAreaofPolygon = (polygon:any) => {
  const newpolygon = polygon.map((point:any) => [point.latitude, point.longitude]);
  newpolygon.push(newpolygon[0]);
  console.log('newpolygon', newpolygon);
  const area = geolib.getAreaOfPolygon(newpolygon);
  console.log('area', area);
  return area;
};

/**
 * Creates a new polygon from an input polygon and a buffer distance
 * @param {*} poly input polygon, if buffer does not fit inside input will return empty
 * @param {*} meterDistance negative value buffers inward, positive outward
 * @returns Array of longitude, latitudes
 */
export const bufferPolygon = (poly:any, meterDistance:any) => {
  const turfCoordinates = [] as any;
  const outPolygon = [] as any;
  poly.forEach((coordinate: any) => {
    turfCoordinates.push([coordinate.longitude, coordinate.latitude]);
  });
  turfCoordinates.push(turfCoordinates[0]); // turf polygons need to be closed
  const turfPolygon = turfHelpersPolygon([turfCoordinates]);
  const turfOut = buffer(turfPolygon, meterDistance, { units: 'meters' });

  if (turfOut !== undefined) {
    turfOut.geometry.coordinates[0].forEach((coordinate) => {
      outPolygon.push({ longitude: coordinate[0], latitude: coordinate[1] });
    });
  }

  return outPolygon;
};

// Check if a point is inside a polygon using ray casting algorithm

// export function isPointInsidePolygon(polygons, existingPoints, newPoint) {
//   console.log("existingPoints",existingPoints,polygons,newPoint)
//   for (let i = 0; i < polygons.length; i++) {
//     const polygon = polygons[i];
//     if (isPointInsidePolygonHelper(polygon.coordinates, newPoint)) {
//       let existingPointInPolygon = false;
//       for (let j = 0; j < existingPoints.length; j++) {
//         if (isPointInsidePolygonHelper(polygon.coordinates, existingPoints[j])) {
//           existingPointInPolygon = true;
//           break;
//         }
//       }
//       if (!existingPointInPolygon) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
//   return false;
// }

// function isPointInsidePolygonHelper(coordinates, testPoint) {
//   console.log("jkjkjkj",coordinates,testPoint)

//   let x = testPoint.longitude
//   let y = testPoint.latitude
//   let inside = false;
//   for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
//     let xi = coordinates[i].longitude;
//     let yi = coordinates[i].latitude;
//     let xj = coordinates[j].longitude;
//     let yj = coordinates[j].latitude;
//     let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//     if (intersect) inside = !inside;
//   }
//   // const isthere = geolib.isPointInPolygon(testPoint.coordinates, coordinates);
//   console.log("firstnnnnn",inside)

//   return inside;
// }

export function isNewPointInsidePolygon(newPoint:any, polygons:any, existingPoints:any) {
  // Check if the new point is inside any of the polygons
  for (let i = 0; i < polygons.length; i++) {
    if (isPointInsidePolygon(newPoint.coordinates[0], polygons[i])) {
      // The new point is inside a polygon, check if there are any existing points
      if (isExistingPointInsidePolygon(polygons[i], existingPoints)) {
        return false; // There is an existing point inside the polygon
      }
      return true; // There are no existing points inside the polygon
    }
  }
  return false; // The new point is not inside any of the polygons
}

export function isPointInsidePolygon(point:any, polygon:any) {
  // This function uses the ray casting algorithm to check if a point is inside a polygon
  let inside = false;
  for (
    let i = 0, j = polygon.coordinates.length - 1;
    i < polygon.coordinates.length;
    j = i++
  ) {
    const xi = polygon.coordinates[i].longitude;
    const yi = polygon.coordinates[i].latitude;
    const xj = polygon.coordinates[j].longitude;
    const yj = polygon.coordinates[j].latitude;
    const intersect =
      yi > point.latitude !== yj > point.latitude &&
      point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isExistingPointInsidePolygon(polygon:any, existingPoints:any) {
  // Check if any of the existing points are inside the polygon
  for (let i = 0; i < existingPoints.length; i++) {
    if (isPointInsidePolygon(existingPoints[i], polygon)) {
      return true; // An existing point is inside the polygon
    }
  }
  return false; // There are no existing points inside the polygon
}

// these are the data example:
// let newPoint = {
//   coordinates: [{latitiude:37.4227088605763, longitude:-122.08493694663049}],
//   holes:[]
// };

// let polygons = [

//   {coordinates:[
//     {latitude:37.434834508380,longitude:-122.08489849457},

//   {latitude:37.434834508380,longitude:-122.08489849457},
//   {
//     latitude:37.434834508380,longitude:-122.08489849457
//   },
//   {latitude:37.434834508380,longitude:-122.08489849457},
// ],
//   holes:[]},
//   {coordinates:[
//     {latitude:37.434834508380,longitude:-122.08489849457},

//   {latitude:37.434834508380,longitude:-122.08489849457},
//   {
//     latitude:37.434834508380,longitude:-122.08489849457
//   },
//   {latitude:37.434834508380,longitude:-122.08489849457},
// ],
//   holes:[]}

// ];

// let existingPoints = [

//    {latitude:37.4227088605763,longitude:-122.08493694663049},

//   {latitude:37.422708860576 ,longitude: -122.08493694663049}

//   ]
// now create the function that suits this data model which will do
// first check if the new point is inside a polygon of the array of polygons, if its inside one of polygon then check if there is any existing point or not. if there is no existing point and the new point is inside the polygon then return true otherwise return false
function degreesToRadians(degrees:any) {
  return degrees * Math.PI / 180;
}

export function calculateArea(coordinates:any) {
  // Convert latitude and longitude to Cartesian coordinates (assuming Earth is a perfect sphere)
  // Earth's radius in meters
  const radius = 6371000;

  const cartesianCoords = [];
  for (const coord of coordinates) {
    const latitude = degreesToRadians(coord.latitude);
    const longitude = degreesToRadians(coord.longitude);

    const x = radius * Math.cos(latitude) * Math.cos(longitude);
    const y = radius * Math.cos(latitude) * Math.sin(longitude);
    const z = radius * Math.sin(latitude);

    cartesianCoords.push({ x, y, z });
  }

  // Apply the shoelace formula to calculate the area
  let area = 0;
  const n = cartesianCoords.length;

  for (let i = 0; i < n; i++) {
    const { x: x1, y: y1 } = cartesianCoords[i];
    const { x: x2, y: y2 } = cartesianCoords[(i + 1) % n];
    area += (x1 * y2 - x2 * y1);
  }

  area = Math.abs(area) / 2; // Take the absolute value and divide by 2

  return area;
}
