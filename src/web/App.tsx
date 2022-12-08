import React from "react";
import { Button, Col, Row, Layout } from "antd";
import useReactIpLocation from "react-ip-details";
import "./App.css";

import Logo from "./assets/logo.png";

export const App = () => {
  const {
    currency,
    exchangeRate,
    ipResponse,
    exchangeRateResponse,
    errorMessage,
    geoLocationPosition,
    geoLocationErrorMessage,
    currencyString,
  } = useReactIpLocation({ numberToConvert: 100 });
  return (
    <Layout style={{ height: "100vh" }}>
      <Col>
        <Row align="middle" justify="center">
          <Logo />
          <h1>Welcome to an unofficial All4 TV client</h1>
          <p>
            Remember that you need to get a British IP address in order to be
            able to watch this channel
          </p>
          <div>
            {`Local currency string format is ${currencyString}`}
            {`Local currency is ${currency}`}
            {`Geo location details: ${geoLocationPosition}`}
            {`Exchange rate is ${exchangeRate}`}
            {`Error Message: ${errorMessage}`}
            {`Geo Error Message: ${geoLocationErrorMessage}`}
          </div>
          <Button
            onClick={() => {
              window.electronAPI.continue();
            }}
          >
            Continue
          </Button>
        </Row>
      </Col>
    </Layout>
  );
};
