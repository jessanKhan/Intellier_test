import {
  Dimensions,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import MapView, {
  MAP_TYPES,
  MapPressEvent,
  MapPolygon,
  MapPolygonProps,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import marker from '../../assets/marker.png';
import ball from '../../assets/ball.png';
import penIcon from '../../assets/mapping/penIcon.png';

import clearicon from '../../assets/mapping/eraseIcon.png';
import undoicon from '../../assets/mapping/undoIcon.png';
import centerIcon from '../../assets/mapping/mapPinIcon.png';
import helpIcon from '../../assets/mapping/helpIcon.png';
import {
  shouldDrawLine,
  doPolygonsOverlap,
  findifthere,
  isNewPointInsidePolygon,
  isPointInsidePolygon,
  calculateArea,
} from '../../utils/AreaUtil';
import {

  stepDown,
  stepUp,
  stepReset,
} from '../../redux/Actions/appStateAction';
import styles from './Styles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {
  DefaultBlankPageWithBack,
} from '../../Components/DefaultPages/DefaultBlankPage';
import homemarker from '../../assets/home.png';
import streetLabel from '../../assets/streetLabel.png';
import MapMarker from '../../Components/MapMarker/MapMarker';
import { DANDY_COLORS } from '../../utils/DefaultFormatting';


import { requestLocationPermission } from '../../utils/permission';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0000012;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialPosition = {
  coords: {
    accuracy: 5,
    altitude: 4.920991817048963,
    altitudeAccuracy: 3,
    heading: 0,
    latitude: 37.4219983,
    longitude: -122.084,
    speed: 0,
  },
};



interface PolygonType {
  coordinates: { latitude: number; longitude: number }[];
  holes: { latitude: number; longitude: number }[][];
}

function Area() {
  const [editing, setEditing] = useState<any | null>(null);
  const [boundary, setBoundary] = useState<PolygonType[]>([]);
  const [fatalArea, setFatalArea] = useState<PolygonType[]>([]);
  const [sections, setSections] = useState<PolygonType[]>([]);
  const [bridge, setBridge] = useState<PolygonType[]>([]);
  const [homePoint, setHomePoint] = useState<{ latitude: number; longitude: number }[]>([]);
  const [step, setStep] = useState<number>(0);
  const [enable, setEnable] = useState<boolean>(false);
  const [geofencingInfoVisible, setGeofencingInfoVisible] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(initialPosition.coords.latitude);
  const [lng, setLng] = useState<number>(initialPosition.coords.longitude);
  const [creatingHole, setCreatingHole] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(true);
  const [nextVisible, setNextVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [useHybrid, setUseHybrid] = useState<boolean>(true);
  const [activityLoader, setActivityLoader] = useState<boolean>(true);
  const insets = useSafeAreaInsets();
  const [boundaryPolygons, setBoundaryPolygons] = useState<any>([]);
  const [fatalAreaPolygons, setFatalAreaPolygons] = useState<any>([]);
  const [sectionPolygons, setsectionPolygons] = useState<any>([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Create a ref for the MapView
  const mapRef = useRef<MapView>(null);

  let timeout1: NodeJS.Timeout | undefined;

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setActivityLoader(false);
      },
      (error: any) => {
        console.log(error.code, error.message);
        setActivityLoader(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission()
    getCurrentLocation();
  }, []);

  useEffect(() => {
    setBoundaryPolygons(
      boundary.map((polygon) => (
        <CustomPolygon
          key={Math.random()}
          coordinates={polygon.coordinates}
          holes={polygon.holes}
          strokeColor="rgba(192,192,192,1)"
          fillColor="rgba(10,10,10,0.5)"
          strokeWidth={2}
        />
      ))
    );
  }, [boundary]);

  useEffect(() => {
    setFatalAreaPolygons(
      fatalArea.map((polygon) => (
        <CustomPolygon
          key={Math.random()}
          coordinates={polygon.coordinates}
          holes={polygon.holes}
          strokeColor="rgba(255,0,0,1)"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={2}
        />
      ))
    );
  }, [fatalArea]);

  useEffect(() => {
    setsectionPolygons(
      sections.map((polygon) => (
        <CustomPolygon
          key={Math.random()}
          coordinates={polygon.coordinates}
          holes={polygon.holes}
          strokeColor="rgba(30,0,255,1)"
          fillColor="rgba(0,0,255,0.5)"
          strokeWidth={2}
        />
      ))
    );
  }, [sections]);

  const selectBoundary = () => {
    if (editing) {
        setBoundary([...boundary, editing]);
        setNextVisible(true);
        setEditing(null);
      } else {
        // toastMessageDisplay(toastTypes.boundarySizeIssueToast);
        setEditing(null);
      }
    
  };

  const selectFatalArea = () => {
    if (editing) {
      if (
        findifthere(boundary, editing) &&
        !doPolygonsOverlap(fatalArea, editing)
      ) {
        setFatalArea([...fatalArea, editing]);
        setEditing(null);
      } else {
        // toastMessageDisplay(toastTypes.fatalAreaOverlapIssueToast);
        setEditing(null);
      }
    }
  };

  const selectSection = () => {
    if (editing) {
      const area = calculateArea(editing.coordinates);
      if (area > 20 && area < 20234) {
        if (
          findifthere(boundary, editing) &&
          !doPolygonsOverlap(sections, editing)
        ) {
          setSections([...sections, editing]);
          setNextVisible(true);
          setEditing(null);
        } else {
          // toastMessageDisplay(toastTypes.sectionOverlapIssueToast);
          setEditing(null);
        }
      } else {
        // toastMessageDisplay(toastTypes.sectionAreaIssueToast);
        setEditing(null);
      }
    }
  };

  const selectBridge = () => {
    if (editing && !doPolygonsOverlap(fatalArea, editing)) {
      const first = { coordinates: [editing.coordinates[0]] };
      const last = {
        coordinates: [editing.coordinates[editing.coordinates.length - 1]],
      };
      if (
        editing.coordinates.length > 1 &&
        editing.coordinates.every((coord:any) =>
          isPointInsidePolygon(coord, boundary[0])
        ) &&
        isNewPointInsidePolygon(first, sections, []) &&
        isNewPointInsidePolygon(last, sections, first.coordinates)
      ) {
        setBridge([...bridge, editing]);
        setEditing(null);
      } else {
        // toastMessageDisplay(toastTypes.bridgeEndpointIssueToast);
        setEditing(null);
      }
    } else {
      // toastMessageDisplay(toastTypes.fatalAreaBridgeIssueToast);
      setEditing(null);
    }
  };

  const selectHomePoint = () => {
    if (
      editing &&
      isNewPointInsidePolygon(editing, sections, homePoint) &&
      !findifthere(fatalArea, editing)
    ) {
      setHomePoint([
        ...homePoint,
        editing.coordinates[editing.coordinates.length - 1],
      ]);
      setEditing(null);
    } else {
      // toastMessageDisplay(toastTypes.homeIssueToast);
      setEditing(null);
    }
  };

  const clear = () => {
    setEditing(null);
    setCreatingHole(false);
    setEnable(true);
    switch (step) {
      case 1:
        setBoundary([]);
        setFatalArea([]);
        setSections([]);
        setBridge([]);
        setHomePoint([]);
        setNextVisible(false);
        break;
      case 2:
        setSections([]);
        setBridge([]);
        setHomePoint([]);
        setNextVisible(false);
        break;
      case 3:
        setFatalArea([]);
        setBridge([]);
        setHomePoint([]);
        break;
      case 4:
        setBridge([]);
        break;
      case 5:
        setHomePoint([]);
        break;
      default:
        break;
    }
  };
  const reset= ()=> {
    dispatch(stepReset())
    setEditing(null);
    setCreatingHole(false);
    setEnable(true);
    setBoundary([]);
    setFatalArea([]);
    setSections([]);
    setBridge([]);
    setHomePoint([]);
    setNextVisible(false);
    setStep(0)
  }

  const allowImmediateNext = (step: number) => {
    let allowImmediate = false;
    switch (step) {
      case 1:
        allowImmediate = boundary.length !== 0;
        break;
      case 2:
        allowImmediate = sections.length !== 0;
        break;
      case 3:
        allowImmediate = true;
        break;
      case 4:
        allowImmediate = true;
        break;
      case 5:
        allowImmediate = true;
        break;
      default:
        break;
    }
    return allowImmediate;
  };

  function removeLastCoordinate() {
    if (editing && editing.coordinates.length === 1) {
      setEditing(null);
    } else if (editing && editing.coordinates.length > 1) {
      const tempCoordinates = [...editing.coordinates];
      tempCoordinates.pop();
      setEditing({
        ...editing,
        coordinates: tempCoordinates,
      });
    }
  }

  const onPress = (e: MapPressEvent) => {
    console.log("press holo",editing && shouldDrawLine(editing, e.nativeEvent.coordinate))
    if (shouldDrawLine(editing, e.nativeEvent.coordinate)) {
      console.log("first")
      if (!editing) {
      console.log("2nd")

        setEditing({
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        });
      } else if (!creatingHole) {
        setEditing({
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        });
      } else {
        const holes = [...editing.holes];
        holes[holes.length - 1] = [
          ...holes[holes.length - 1],
          e.nativeEvent.coordinate,
        ];
        setEditing({
          ...editing,
          coordinates: [...editing.coordinates],
          holes,
        });
      }
    }
  };

  const moveForward = () => {
    if (step === 1) {
      return selectBoundary();
    }
    if (step === 2) {
      return selectSection();
    }
    if (step === 3) {
      return selectFatalArea();
    }
    if (step === 4) {
      return selectBridge();
    }
    if (step === 5) {
      return selectHomePoint();
    }
  };

  const mapOptions = {
    scrollEnabled: true,
    zoomEnabled: true,
  };
  if (editing) {
    mapOptions.scrollEnabled = true;
    mapOptions.zoomEnabled = true;
  }

  const blockEnable = (checkStep: number) =>
    (checkStep === 4 && sections.length === 1) ||
    (checkStep === 1 && boundary.length > 0);

  const next = () => {
    if (
      step === 3 ||
      step === 4 ||
      step === 5 ||
      (boundary.length > 0 && !enable) ||
      (sections.length > 0 && !enable)
    ) {
      setNextVisible(true);
    }
  };

  const backPress = () => {
    setEnable(!blockEnable(step - 1));
    setStep(step - 1);
    dispatch(stepDown());
    setVisible(true);
    setEditing(null);
    setNextVisible(allowImmediateNext(step - 1));
  };

  const bottomText = (step: number) => {
    let title = 'Create your';
    let subtitle = ' geofence';
    switch (step) {
      case 1:
        title = '1. Mark your';
        subtitle = ' property boundary';
        break;
      case 2:
        title = '2. Mark all';
        subtitle = ' grass areas';
        break;
      case 3:
        title = '3. Mark any';
        subtitle = ' no-go zones';
        break;
      case 4:
        title = '4. Mark any';
        subtitle = ' travel paths';
        break;
      case 5:
        title = '5. Select your';
        subtitle = ' home points';
        break;
      case 6:
        title = '6. You are Done';
        subtitle = ' Can restart';
        break;
      default:
        break;
    }

    return (
      <View style={[{ justifyContent: 'flex-start', paddingVertical: 5 }]}>
        <View style={styles.bottomContainerTitle}>
          <Text
            style={[
              styles.titleTextStyle,
              {
                textTransform: 'none',
                color: DANDY_COLORS.whiteDefault,
              },
            ]}
          >
            {title}
          </Text>
        </View>
        <View style={styles.bottomContainerTitle}>
          <Text
            style={[
              styles.titleBoldTextStyle,
              {
                textTransform: 'none',
                color: DANDY_COLORS.whiteDefault,
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>
      </View>
    );
  };

  const stepList = (step: number) => {
    const stepIcon = (stepNum: number, currentStep: number) => {
      const backColor =
        stepNum > currentStep ? 'rgba(0,0,0,0)' : DANDY_COLORS.whiteDefault;
      const textColor =
        stepNum > currentStep
          ? DANDY_COLORS.whiteDefault
          : DANDY_COLORS.navyBlueDefault;
      return (
        <View
          style={{
            backgroundColor: backColor,
            borderRadius: 5,
            borderColor: DANDY_COLORS.whiteDefault,
            borderWidth: 1,
            paddingHorizontal: 5,
            margin: 2,
          }}
        >
          <Text
            style={[
              styles.titleTextStyle,
              { color: textColor, fontSize: 16, padding: 2 },
            ]}
          >
            {stepNum}
          </Text>
        </View>
      );
    };

    if (step === 0) {
      return null;
    }
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
        {stepIcon(1, step)}
        {stepIcon(2, step)}
        {stepIcon(3, step)}
        {stepIcon(4, step)}
        {stepIcon(5, step)}
        {stepIcon(6, step)}
      </View>
    );
  };

  const opaqueButton = (text: string, onPress: (event: GestureResponderEvent) => void) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 5,
        borderColor: DANDY_COLORS.whiteDefault,
        borderWidth: 2,
        paddingHorizontal: 5,
        margin: 2,
      }}
    >
      <Text
        style={[styles.titleTextStyle, { color: DANDY_COLORS.whiteDefault }]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  useEffect(
    () => () => {
      clearTimeout(timeout1);
    },
    []
  );

  function CustomPolygon(
    props: React.JSX.IntrinsicAttributes &
      React.JSX.IntrinsicClassAttributes<MapPolygon> &
      Readonly<MapPolygonProps>
  ) {
    const ref = useRef<any>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.setNativeProps({
          fillColor: props.fillColor,
          strokeColor: props.strokeColor,
          strokeWidth: props.strokeWidth,
        });
      }
    });

    timeout1 = setTimeout(() => {
      if (ref.current) {
        ref.current.setNativeProps({
          fillColor: props.fillColor,
          strokeColor: props.strokeColor,
          strokeWidth: props.strokeWidth,
        });
      }
    }, 100);

    return <Polygon ref={ref} {...props} />;
  }

  if (activityLoader) {
    return (
      <DefaultBlankPageWithBack>
        <View
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </DefaultBlankPageWithBack>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}  // Use ref here instead of `this.map`
        style={styles.map}
        mapType={useHybrid ? MAP_TYPES.HYBRID : MAP_TYPES.SATELLITE}
        onPress={(e) => {
          if (enable) {
            onPress(e);
          }
        }}
        maxZoomLevel={20}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onRegionChangeComplete={() => {
          if (!mapInitialized && mapRef.current) {
            mapRef.current.animateCamera({
              center: {
                latitude: lat,
                longitude: lng,
              },
              zoom: 20,
            });
            setMapInitialized(true);
          }
        }}
        moveOnMarkerPress={false}
      >
        {!editing && useHybrid && (
          <MapMarker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            title="My Location"
            description="Initial Location"
            image={marker}
            small={false}
            anchorMiddle={false}
          />
        )}
       

        {boundaryPolygons}
        {fatalAreaPolygons}
        {sectionPolygons}

        {bridge.map((item) => (
          <Polyline
            key={Math.random()}
            coordinates={item.coordinates}
            // holes={item.holes}
            strokeColor="rgba(0,255,0,1)"
            strokeWidth={2}
          />
        ))}

        {editing && step < 5 && (
          <Polyline
            key={Math.random()}
            coordinates={editing.coordinates}
            strokeColor={(() => {
              switch (step) {
                case 1:
                  return 'rgba(192,192,192,1)';
                case 2:
                  return 'rgba(30,0,255,1)';
                case 3:
                  return 'rgba(255,0,30,1)';
                default:
                  return 'rgba(0,255,0,1)';
              }
            })()}
            strokeWidth={2}
          />
        )}
        {editing && step === 5 && (
          <MapMarker
            coordinate={editing.coordinates[editing.coordinates.length - 1]}
            title="Home Point"
            description="This is where Robot will return"
            image={homemarker}
            tappable={false}
            small={false}
            anchorMiddle
          />
        )}
        {homePoint.map((item, i) => (
          <MapMarker
            key={i}
            coordinate={item}
            tappable={false}
            image={homemarker}
            small={false}
            anchorMiddle
          />
        ))}
        {editing && step < 5 && (
          <MapMarker
            coordinate={editing.coordinates[editing.coordinates.length - 1]}
            tappable={false}
            image={ball}
            small
            anchorMiddle
          />
        )}
      </MapView>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'space-between',
          paddingTop: insets.top,
        }}
        pointerEvents="box-none"
      >
        {/* <BackButton/> */}
        {step > 0 && step < 6 && (
          <ScrollView
            style={[styles.scrollSideBar, { marginRight: insets.right + 10 }]}
          >
            <View
              style={{
                backgroundColor: enable
                  ? DANDY_COLORS.navyBlueDefault
                  : DANDY_COLORS.paleGreenDefault,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <CustomButton
                label={(() => {
                  const bridgeComplete =
                    editing && step === 4 && editing.coordinates.length > 1;
                  const HomeComplete =
                    editing && step === 5 && editing.coordinates.length > 0;
                  const boundaryComplete =
                    editing &&
                    step !== 5 &&
                    step !== 4 &&
                    editing.coordinates.length > 2;
                  if (bridgeComplete || HomeComplete || boundaryComplete) {
                    return 'Finish';
                  }
                  if (enable) {
                    return 'Mark';
                  }
                  return 'Add';
                })()}
                onPress={() => {
                  if (enable && editing) {
                    moveForward();
                    setEnable(false);
                    next();
                  } else if (
                    (!editing && step > 1) ||
                    (step === 1 && boundary.length === 0)
                  ) {
                    if (blockEnable(step)) {
                      // toastMessageDisplay(toastTypes.bridgeNotNeededToast);
                    } else {
                      setEnable(true);
                    }
                  }
                }}
                image={penIcon}
                useColumn
                elementColor={
                  enable
                    ? DANDY_COLORS.paleGreenDefault
                    : DANDY_COLORS.navyBlueDefault
                }
              />
            </View>
            <CustomButton
              label="Undo"
              onPress={() => editing && step !== 6 && removeLastCoordinate()}
              image={undoicon}
              useColumn
            />
            <CustomButton
              label={'Clear\nAll'}
              onPress={() => step !== 6 && clear()}
              image={clearicon}
              useColumn
            />
            <CustomButton
              label="Center"
              onPress={() => {
                getCurrentLocation();
                Geolocation.getCurrentPosition(
                  (position) => {
                    mapRef.current?.animateCamera({
                      center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      },
                    });
                  },
                  (error) => {
                    console.log(error.code, error.message);
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                    // accuracy: 'high',
                  }
                );
              }}
              image={centerIcon}
              useColumn
            />
            <CustomButton
              label={useHybrid ? 'Hide' : 'Show'}
              onPress={() => {
                setUseHybrid(!useHybrid);
              }}
              image={streetLabel}
              useColumn
            />
          </ScrollView>
        )}
        <View
          style={[
            styles.bottomContainer,
            {
              paddingBottom: insets.bottom,
              paddingRight: insets.right,
              paddingLeft: insets.left,
            },
          ]}
        >
          <View style={styles.bottomContainerMain}>
            {bottomText(step)}
            {loading && (
              <View style={styles.horizontal}>
                <ActivityIndicator
                  size="large"
                  color={DANDY_COLORS.whiteDefault}
                />
              </View>
            )}
            <View style={{ flexDirection: 'row' }}>
              {step >= 2 && !editing && opaqueButton('Back', () => backPress())}
              {step === 6 && opaqueButton('Reset', () => reset())}
              {nextVisible &&
                !editing &&
                opaqueButton('Next', () => {
                  setEnable(!blockEnable(step + 1));
                  setStep(step + 1);
                  dispatch(stepUp());
                  setVisible(true);
                  setNextVisible(allowImmediateNext(step + 1));
                })}
              {step === 0 &&
                opaqueButton('Add', () => {
                  setEnable(true);
                  setStep(step + 1);
                  dispatch(stepUp());
                  setVisible(true);
                  setNextVisible(allowImmediateNext(step + 1));
                })}
            </View>
          </View>
          <View style={styles.bottomContainerMain}>
            {stepList(step)}
            
          </View>
        </View>
      </View>
    </View>
  );
}

export default Area;
