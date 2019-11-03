/*
 *
 * GoogleAd
 *
 */

import React, { useEffect } from 'react';
// import styled from 'styled-components';

import { googleAdClientToken } from 'settings';
import { GoogleAdProps, GoogleAdPropsDefaultProps } from './types';

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
  return (
    <div style={props.wrapperDivStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        {...optionalAttr}
        data-ad-client={props.client}
        data-ad-slot={props.slot}
        data-ad-format={props.format}
      />
    </div>
  );
};

GoogleAd.defaultProps = GoogleAdPropsDefaultProps;

export const RegisterGoogleAd = ({ clientToken }: { clientToken: string }) => (
  Wrapped: typeof GoogleAd,
) => (props: Omit<GoogleAdProps, 'client'>) =>
  clientToken ? <Wrapped client={clientToken} {...props} /> : null;

export default RegisterGoogleAd({ clientToken: googleAdClientToken })(GoogleAd);
