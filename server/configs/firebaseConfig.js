import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

import firebaseConfig from "../keys/firebaseConfig.json" assert {type: "json"};

initializeApp(firebaseConfig);
const storageDB = getStorage();

export {storageDB};