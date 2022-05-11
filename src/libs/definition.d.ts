import { vuePrototype } from "./definition";
import { AxiosInstance } from "axios";

interface VuePrototypeDefinition {
  axios: AxiosInstance;
}

export function vuePrototype(): VuePrototypeDefinition;
