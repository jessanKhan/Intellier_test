// import React, { ReactNode } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Modal,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   ViewStyle,
//   TextStyle,
//   ImageStyle,
// } from 'react-native';
// import { DANDY_COLORS } from '../../utils/DefaultFormatting';
// import cancelIcon from '../../assets/cross.png';

// interface DefaultModalProps {
//   title: string;
//   subTitle?: string;
//   showButtons: boolean;
//   useSubmit: boolean;
//   innerElement?: ReactNode;
//   onCancel: () => void;
//   textCancel: string;
//   onSubmit?: () => void;
//   textSubmit?: string;
// }

// const DefaultModal: React.FC<DefaultModalProps> = ({
//   title,
//   subTitle,
//   showButtons,
//   useSubmit,
//   innerElement,
//   onCancel,
//   textCancel,
//   onSubmit,
//   textSubmit,
// }) => {
//   return (
//     <Modal animationType="slide" transparent>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'android' ? undefined : 'padding'}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <View style={[styles.rowView, { paddingTop: 20 }]}>
//               <Text style={styles.titleTextStyle}>{title}</Text>
//               <TouchableOpacity onPress={onCancel}>
//                 <Image
//                   style={[
//                     styles.image,
//                     { tintColor: DANDY_COLORS.navyBlueDefault },
//                   ]}
//                   source={cancelIcon}
//                 />
//               </TouchableOpacity>
//             </View>
//             <ScrollView>
//               {subTitle && (
//                 <View style={styles.rowView}>
//                   <Text style={styles.subTitleTextStyle}>{subTitle}</Text>
//                 </View>
//               )}
//               <View style={styles.rowView}>{innerElement}</View>
//               {showButtons && (
//                 <View
//                   style={[
//                     styles.rowView,
//                     {
//                       paddingBottom: 20,
//                       justifyContent: useSubmit ? 'space-between' : 'center',
//                     },
//                   ]}
//                 >
//                   <TouchableOpacity
//                     style={[styles.button, styles.buttonCancel]}
//                     onPress={onCancel}
//                   >
//                     <Text style={styles.textCancel}>{textCancel}</Text>
//                   </TouchableOpacity>
//                   {useSubmit && onSubmit && textSubmit && (
//                     <TouchableOpacity
//                       style={[styles.button, styles.buttonSubmit]}
//                       onPress={onSubmit}
//                     >
//                       <Text style={styles.textSubmit}>{textSubmit}</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default DefaultModal;

// const styles = StyleSheet.create({
//   centeredView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0)',
//   } as ViewStyle,
//   modalView: {
//     backgroundColor: DANDY_COLORS.whiteDefault,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: '90%',
//     maxHeight: '80%',
//     flexDirection: 'column',
//   } as ViewStyle,
//   rowView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//   } as ViewStyle,
//   button: {
//     borderRadius: 10,
//     padding: 5,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 2,
//     elevation: 2,
//     minWidth: '30%',
//     marginHorizontal: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   } as ViewStyle,
//   image: {
//     resizeMode: 'contain',
//     height: 25,
//     width: 25,
//   } as ImageStyle,
//   buttonCancel: {
//     backgroundColor: DANDY_COLORS.whiteDefault,
//   } as ViewStyle,
//   buttonSubmit: {
//     backgroundColor: DANDY_COLORS.solidGreenDefault,
//   } as ViewStyle,
//   textCancel: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: DANDY_COLORS.navyBlueDefault,
//   } as TextStyle,
//   textSubmit: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: DANDY_COLORS.whiteDefault,
//   } as TextStyle,
//   subTitleTextStyle: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     color: DANDY_COLORS.navyBlueDefault,
//   } as TextStyle,
//   titleTextStyle: {
//     fontSize: 25,
//     color: DANDY_COLORS.navyBlueDefault,
//     textTransform: 'capitalize',
//   } as TextStyle,
// });
