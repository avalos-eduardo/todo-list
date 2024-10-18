import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { 
    env: {
      node: true,  // Enables Node.js global variables
    },
    globals: globals.browser }},
  pluginJs.configs.recommended, 
];