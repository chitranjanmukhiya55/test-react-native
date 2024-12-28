import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Platform } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle, consolepro, Lang_chg, Font, Colors, mobileH, mobileW, localimag, notification } from './utilslib/Utils';

const GradientText = ({ colors, ...rest }) => {
  return (
    <>
      {Platform.OS == 'ios' ?
        <MaskedView maskElement={<Text {...rest} />}>
          <LinearGradient colors={colors}  start={{ x: 0, y: 0}}
          end={{ x: 0, y: 1 }}>
            <Text {...rest} style={[rest.style, { opacity: 0 }]} />
          </LinearGradient>
        </MaskedView>
        :
        <LinearTextGradient
          locations={[0, 1]}
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}>
          <Text {...rest} style={[rest.style, { opacity: 0 }]} />
        </LinearTextGradient>}
    </>
  );
};

export default GradientText;