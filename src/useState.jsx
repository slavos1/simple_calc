import meta from "../package.json";
import useLocalStorageState from "use-local-storage-state";

export const useState = (key, defaultValue) => {
  return useLocalStorageState(`${meta.name}/${key}`, {
    defaultValue,
  });
};
