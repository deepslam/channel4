export type IpRegionResponse = {
  "query": string;
  "status": "success" | "fail";
  "continent": string;
  "continentCode": string;
  "country": string;
  "countryCode": string;
  "region": string;
  "regionName": string;
  "city": string;
  "district": string;
  "zip": string;
  "lat": number;
  "lon": number;
  "timezone": string;
  "offset": number;
  "currency": string;
  "isp": string;
  "org": string;
  "as": string;
  "asname": string;
  "mobile": boolean;
  "proxy": boolean;
  "hosting": boolean;
}
