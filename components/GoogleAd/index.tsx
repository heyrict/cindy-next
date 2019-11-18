/*
 *
 * GoogleAd
 *
 */

import React, { useEffect } from 'react';
import { googleAdClientToken, isUserPatron } from 'settings';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { GoogleAdProps, GoogleAdPropsDefaultProps } from './types';
import { StateType } from 'reducers/types';

export const GoogleAd = (props: GoogleAdProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  });

  const optionalAttr = {
    'data-ad-layout-key': props.layoutKey,
    'data-ad-layout': props.layout,
  };
  const childfn = props.children || (c => c);
  const ads = childfn(
    <div style={props.wrapperDivStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        {...optionalAttr}
        data-ad-client={props.client}
        data-ad-slot={props.slot}
        data-ad-format={props.format}
      />
    </div>,
  );

  return isUserPatron(props.userId) ? ads : null;
};

GoogleAd.defaultProps = GoogleAdPropsDefaultProps;

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export const registerGoogleAd = ({ clientToken }: { clientToken: string }) => (
  Wrapped: React.FC<any>,
) => (props: Omit<GoogleAdProps, 'client'>) =>
  clientToken ? <Wrapped client={clientToken} {...props} /> : null;

export default withRedux(
  registerGoogleAd({ clientToken: googleAdClientToken })(GoogleAd),
);
