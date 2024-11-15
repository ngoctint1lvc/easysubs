import {FC, useState, PropsWithChildren, useEffect} from "react";
import { createPortal } from "react-dom";

import { $streaming } from "@src/models/streamings";

import { useUnit } from "effector-react";
import { SettingsContent } from "./SettingsContent";
import { MonoLogo } from "./assets/MonoLogo";
import { Toaster } from "react-hot-toast";

type TSettingsProps = {
  contentContainer: HTMLElement;
};

const Toast = () => {
  return <div className="es-toast">
    <Toaster/>
  </div>
}

export const Settings: FC<TSettingsProps> = () => {
  const [showSettings, setShowSettings] = useState(false);
  const streaming = useUnit($streaming);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };
  let removeESToast = () => {
    document.querySelector("body > .es-toast")?.remove();
    return false;
  }
  return (
    <>
      <div className="es-settings-icon" onClick={handleClick}>
        <MonoLogo />
      </div>
      {showSettings &&
        createPortal(
          <SettingsContent onClose={() => setShowSettings(false)} />,
          streaming.getSettingsContentContainer(),
        )}
      {removeESToast() || createPortal(
        <Toast />,
        document.querySelector("body"),
      )}
    </>
  );
};
