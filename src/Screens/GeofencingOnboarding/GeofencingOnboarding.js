import {
  Image,
  Dimensions,
  View,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// import { setGeoOnboard } from '../../redux/Actions/appStateAction';
import { DANDY_COLORS } from '../../utils/DefaultFormatting';
import Legend from '../../Components/Legend/Legend';
import styles from './Styles';

import boundaryHelpImage from '../../assets/steps/step1.jpeg';
import sectionHelpImage from '../../assets/steps/step3.jpeg';
import fatalHelpImage from '../../assets/steps/step2.jpeg';
import bridgeHelpImage from '../../assets/steps/step4.jpeg';
import homeHelpImage from '../../assets/steps/step5.jpeg';

function BotttomButton(text, press) {
  return (
    <Button
      title={text}
      buttonStyle={{
        backgroundColor: DANDY_COLORS.greyDefault,
      }}
      containerViewStyle={{
        marginVertical: 10,
      }}
      textStyle={{ color: DANDY_COLORS.whiteDefault }}
      onPress={press}
    />
  );
}

function StepView(currentStep, modalView) {
  const imageStyle = modalView ? styles.imageModal : styles.image;
  switch (currentStep) {
    case 0:
      return (
        <View style={styles.container}>
          <Image source={boundaryHelpImage} style={imageStyle} />
          <Text style={styles.text}>
            First tap to create a boundary around your entire property. Note
            that due to GPS error, the robot may navigate outside this perimeter
            by 3 meters or more if there is no fence and your grass connects to
            a neighbors grass. Therefore it is recommended to give a buffer for
            sides of your yard that are bounded by fence, and less if there is
            no fence.
          </Text>
        </View>
      );
    case 1:
      return (
        <View style={styles.container}>
          <Image source={sectionHelpImage} style={imageStyle} />
          <Text style={styles.text}>
            Tap to create sections that cover areas of grass. Each section
            should represent one continuous area of grass. Create a new section
            if separated by a fence, sidewalk, etc.
          </Text>
        </View>
      );
    case 2:
      return (
        <View style={styles.container}>
          <Image source={fatalHelpImage} style={imageStyle} />
          <Text style={styles.text}>
            Tap to create no-go zones for areas within your property that are
            critical that the robot not enter. For example, pools and ponds
            should be designated as no-go zones, especially if they do not have
            a concrete perimeter.
          </Text>
        </View>
      );
    case 3:
      return (
        <View style={styles.container}>
          <Image source={bridgeHelpImage} style={imageStyle} />
          <Text style={styles.text}>
            Tap to create segmented lines to connect sections. These paths will
            let the robot travel from one section to another if possible. For
            example, create these paths over sidewalks and driveways, but not
            across a fence.
          </Text>
        </View>
      );
    case 4:
      return (
        <View style={styles.container}>
          <Image source={homeHelpImage} style={imageStyle} />
          <Text style={styles.text}>
            Tap within each connected group of sections to create Home Points.
            This is where the robot will return to when it finishes, or becomes
            low on battery or herbicide.
          </Text>
        </View>
      );
    case 5:
      return (
        <View style={styles.container}>
          <Legend
            identifiers={['Property', 'Sections', 'Fatal Areas', 'Bridges']}
            identifierColors={[
              'rgba(255,255,255,1)',
              'rgba(0, 0, 255, 1)',
              'rgba(255,0,0,1)',
              'rgba(0,255,0,1)',
            ]}
          />
          <Text style={styles.text}>
            Confirm the geofence looks good, and give it a name. Now the robot
            will be ready to spray some weeds!
          </Text>
        </View>
      );
    default:
      return null;
  }
}

export function GeofencingOnboarding() {
  const maxPageNumber = 4;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const back = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      navigation.goBack();
    }
  };

  const next = () => {
    if (currentPage < maxPageNumber) {
      setCurrentPage(currentPage + 1);
    } else {
      // dispatch(setGeoOnboard());
      navigation.navigate('Geofencing');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {StepView(currentPage, false)}
      </ScrollView>
      <View style={{ justifyContent: 'flex-end' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {BotttomButton('Back', back)}
          {BotttomButton(
            currentPage === maxPageNumber ? 'Finish' : 'Next',
            next,
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export function GeofencingStepInformation({ step }) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {StepView(step, true)}
      </ScrollView>
    </View>
  );
}
