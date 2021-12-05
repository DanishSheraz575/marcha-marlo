import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Text,
  TSpan,
  Path,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter, style */

const GoForMarchaBtn = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={318} height={100} {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={2.109}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#ff3d57" />
        <Stop offset={1} stopColor="#801f2c" />
      </LinearGradient>
    </Defs>
    <G
      style={{
        filter: "url(#b)",
      }}
    >
      <Rect
        width={276}
        height={58}
        rx={6}
        transform="translate(21 8)"
        style={{
          fill: "url(#a)",
        }}
      />
    </G>
    <Text
      transform="translate(180.761 45)"
      style={{
        fontSize: 22,
        fontFamily: "Roboto-Bold,Roboto",
        fontWeight: 700,
        fill: "#fff",
      }}
    >
      <TSpan x={-87.731} y={0}>
        {"GO FOR MARCHA"}
      </TSpan>
    </Text>
    <Path
      transform="translate(49 20)"
      style={{
        fill: "#f1556a",
      }}
      d="M0 0h34v34H0z"
    />
    <Path
      className="d"
      d="M83.183 20.34v33.844H49.339V20.34h33.844m.339-.339H49v34.522h34.522V20Z"
    />
    <Path
      d="M393.977 564.064v3.942h2.292v-6.493a1.146 1.146 0 0 0-1.146-1.146h-6.493v2.292h3.506a8.758 8.758 0 0 1-7.708 4.583v2.292a11.042 11.042 0 0 0 9.549-5.47Z"
      transform="translate(-318.167 -520.432)"
      style={{
        fill: "#f7b402",
      }}
    />
    <Path
      d="M296.523 455.272v-3.942h-2.292v6.493a1.146 1.146 0 0 0 1.146 1.146h6.493v-2.292h-3.506a8.758 8.758 0 0 1 7.708-4.583V449.8a11.042 11.042 0 0 0-9.549 5.472Z"
      transform="translate(-239.81 -424.382)"
      style={{
        fill: "#662d91",
      }}
    />
    <Path
      className="d"
      d="M59.004 48.337a4.583 4.583 0 1 0-4.583-4.583 4.583 4.583 0 0 0 4.583 4.583Zm0-6.875a2.292 2.292 0 1 1-2.292 2.292 2.292 2.292 0 0 1 2.292-2.291ZM78.102 34.206v-6.493a1.146 1.146 0 0 0-1.146-1.146h-6.493a1.146 1.146 0 0 0-1.146 1.146v6.493a1.146 1.146 0 0 0 1.146 1.146h6.493a1.146 1.146 0 0 0 1.146-1.146Zm-6.49-1.146v-4.2h4.2v4.2Z"
    />
  </Svg>
)

export default GoForMarchaBtn
