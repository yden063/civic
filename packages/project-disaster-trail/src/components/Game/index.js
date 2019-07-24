/* eslint-disable import/no-named-as-default */
import React from "react";
import styled from "styled-components";

// import useChapters from "../../state/hooks/useChapters";

import KitScreen from "./KitScreen";
import Orb from "./Orb";
import OrbManager from "./OrbManager";
import PointsView from "../atoms/PointsView";

import "@hackoregon/component-library/assets/global.styles.css";

const XLScreen = {
  height: 1800,
  interfaceHeight: 700
};

const desktopScreen = {
  interfaceHeight: 250
};

const Game = () => {
  let ratios = XLScreen;
  if (window.innerHeight < XLScreen.height) {
    ratios = desktopScreen;
  }

  return (
    <GameContainerStyle>
      <MapStyle>
        <PointsViewStyle />
        <KitScreen />
      </MapStyle>
      <GUIStyle>
        {/* <Orb size={50} /> */}
        <OrbManager
          orbCount={40}
          orbSize={100}
          period={5}
          minVelocityX={-15}
          maxVelocityX={-3}
          minVelocityY={0}
          maxVelocityY={0}
          ratios={ratios}
        />
      </GUIStyle>
    </GameContainerStyle>
  );
};

Game.displayName = "Game";

const PanelStyle = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
`;

const GameContainerStyle = styled(PanelStyle)`
  position: relative;
  display: grid;
  overflow: hidden;
  height: 100vh;
  min-height: 650px;
  min-width: 800px;
  grid-template-rows: 1fr ${desktopScreen.interfaceHeight}px;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;

  @media (min-height: ${XLScreen.height}px) {
    grid-template-rows: 1fr ${XLScreen.interfaceHeight}px;
  }
`;

const MapStyle = styled(PanelStyle)`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  background: beige;
  width: 100vw;
`;

const GUIStyle = styled(PanelStyle)`
  background: pink;
  height: ${desktopScreen.interfaceHeight}px;

  @media (min-height: ${XLScreen.height}px) {
    height: ${XLScreen.interfaceHeight}px;
  }
`;

const PointsViewStyle = styled(PointsView)`
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid red;
  z-index: 1;
`;

export default Game;
