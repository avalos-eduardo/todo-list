import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { 
    env: {
      node: true,  // Enables Node.js global variables
      // other environments if needed
    },
    globals: globals.browser }},
  pluginJs.configs.recommended, 
];