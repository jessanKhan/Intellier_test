import React, { ReactNode } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconDefault from 'react-native-vector-icons/Ionicons';
import menuBackgroundImage from '../../assets/menu/menuBackground.png';
import { DANDY_COLORS } from '../../utils/DefaultFormatting';
import appStrings from '../../strings/strings';

interface DefaultBlankPageProps {
  children: ReactNode;
}

export function DefaultBlankPage({ children }: DefaultBlankPageProps) {
  return (
    <ImageBackground
      source={menuBackgroundImage}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? undefined : 'padding'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export function BackButton() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.buttonContainer} pointerEvents="box-none">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.buttonView, { paddingLeft: insets.left + 10 }]}
      >
        <IconDefault
          name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
          size={25}
          color={DANDY_COLORS.navyBlueDefault}
        />
        <Text style={styles.titleTextStyle}>{appStrings.en.back}</Text>
      </TouchableOpacity>
    </View>
  );
}

interface DefaultBlankPageWithBackProps {
  children: ReactNode;
}

export function DefaultBlankPageWithBack({ children }: DefaultBlankPageWithBackProps) {
  return (
    <DefaultBlankPage>
      <BackButton />
      {children}
    </DefaultBlankPage>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  } as ImageStyle,
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  } as ViewStyle,
  buttonView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  } as ViewStyle,
  normalTextStyle: {
    fontSize: 15,
    color: DANDY_COLORS.navyBlueDefault,
  } as TextStyle,
  normalBoldTextStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: DANDY_COLORS.navyBlueDefault,
  } as TextStyle,
  titleTextStyle: {
    fontSize: 25,
    color: DANDY_COLORS.navyBlueDefault,
    textTransform: 'capitalize',
  } as TextStyle,
  titleBoldTextStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: DANDY_COLORS.navyBlueDefault,
    textTransform: 'capitalize',
  } as TextStyle,
});
