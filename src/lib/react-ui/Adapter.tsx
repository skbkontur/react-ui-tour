import * as GappedModule from "@skbkontur/react-ui/components/Gapped";
import * as HintModule from "@skbkontur/react-ui/components/Hint";
import * as ModalModule from "@skbkontur/react-ui/components/Modal";
import * as ButtonModule from "@skbkontur/react-ui/components/Button";
import * as ThemeProviderModule from "@skbkontur/react-ui/components/ThemeProvider";
import * as ThemeFactoryModule from "@skbkontur/react-ui/lib/theming/ThemeFactory";
import * as LayoutEventsModule from "@skbkontur/react-ui/lib/LayoutEvents";

const resolveInternalModule = (moduleName: string, context) => {
  let modulePath;
  try {
    modulePath = context.resolve(`./${moduleName}`);
  } catch (e) {
    modulePath = context.resolve(`./internal/${moduleName}/${moduleName}/${moduleName}`);
  }
  const Module = __webpack_require__(modulePath);
  return Module;
};

const ZIndexContext = require.context("@skbkontur/react-ui", true, /ZIndex/);
const ZIndexModule = resolveInternalModule("ZIndex", ZIndexContext);

const PopupContext = require.context("@skbkontur/react-ui", true, /Popup/);
const PopupModule = resolveInternalModule("Popup", PopupContext);

const RenderContainerContext = require.context("@skbkontur/react-ui", true, /RenderContainer/);
const RenderContainerModule = resolveInternalModule("RenderContainer", RenderContainerContext);

const RenderLayerContext = require.context("@skbkontur/react-ui", true, /RenderLayer/);
const RenderLayerModule = resolveInternalModule("RenderLayer", RenderLayerContext);

interface JSModule<M> extends Object {
  __esModule?: boolean;
  default?: M;
}

const defaultOrNamed = <T extends JSModule<T[K]>, K extends keyof T>(module: T, component: K): T[K] =>
  module && module.__esModule && module.default ? module.default : module[component];

export const Popup = defaultOrNamed(PopupModule, "Popup");
export const Hint = defaultOrNamed(HintModule, "Hint");
export const Gapped = defaultOrNamed(GappedModule, "Gapped");
export const Modal = defaultOrNamed(ModalModule, "Modal");
export const Button = defaultOrNamed(ButtonModule, "Button"); 
export const RenderContainer = defaultOrNamed(RenderContainerModule, "RenderContainer");
export const ThemeProvider = defaultOrNamed(ThemeProviderModule, "ThemeProvider");
export const ThemeFactory = defaultOrNamed(ThemeFactoryModule, "ThemeFactory");
export const RenderLayer = defaultOrNamed(RenderLayerModule, "RenderLayer");
export const addListener = defaultOrNamed(LayoutEventsModule, "addListener");
export const ZIndex = defaultOrNamed(ZIndexModule, "ZIndex");
