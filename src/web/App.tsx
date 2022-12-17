import React, { useEffect, useState } from "react";
import { Button, Col, Row, Layout, Typography, Divider, Space } from "antd";
import fetch, { AxiosResponse } from "axios";
import Channels from "./settings.json";

import "./App.css";
import All4Logo from "./logos/all4.png";
import { IpRegionResponse } from "./types/responses";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { TVChannelEnum } from "./types/enums";

export const App = () => {
  const [region, setRegion] = useState<IpRegionResponse | null>(null);
  const [currentTVChannel, setCurrentTVChannel] =
    useState<TVChannelEnum | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch
      .get("http://ip-api.com/json/")
      .then((response: AxiosResponse<IpRegionResponse>) => {
        if (response.status === 200) {
          setRegion({ ...response.data });
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(true);
      });
  }, []);
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header>
        <Row align="middle" justify="space-between">
          <Col span={8} />
          <Col span={6} offset={10}>
            {loading && (
              <LoadingOutlined
                style={{
                  verticalAlign: "middle",
                }}
              />
            )}
            {region && (
              <Row align="middle">
                <Col span={6} style={{ textAlign: "right" }}>
                  {region.countryCode !== "GB" ? (
                    <WarningOutlined
                      style={{
                        fontSize: "48px",
                        color: "#d90429",
                        verticalAlign: "middle",
                      }}
                    />
                  ) : (
                    <CheckCircleOutlined
                      style={{
                        fontSize: "48px",
                        color: "#6a994e",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </Col>
                <Col span={18} style={{ textAlign: "right" }}>
                  <Typography>IP: {region.query}</Typography>
                  <Typography>
                    Country: {region.country} ({region.countryCode})
                  </Typography>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content>
        {!currentTVChannel && (
          <>
            <Row>
              <Col offset={2}>
                <Space>
                  <Typography.Title>
                    Welcome to an Unofficial UK TV client
                  </Typography.Title>
                </Space>
                <Space>
                  <Typography>
                    It supports the following service: All4 Online streaming,
                    BBC iPlayer and UKTVPlay.
                  </Typography>
                </Space>
                <Space>
                  <Typography>
                    Remember that you need to obtain a British IP address in
                    order to be able to watch these channels. At the top of the
                    screen we added a short reminder about your current IP. If
                    it's ok, it would be green.
                  </Typography>
                </Space>
                <Space>
                  <Typography>
                    Please, select a channel you want to watch:
                  </Typography>
                </Space>
              </Col>
            </Row>
            <Col>
              <Row align="middle" justify="center">
                <Col>
                  <Row>
                    <img width={250} src={All4Logo} alt="All4" />
                  </Row>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Layout.Content>
    </Layout>
  );
};
