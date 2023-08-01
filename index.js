import * as fs from 'fs';
import 'dotenv/config';
import {FetchAPI} from './FetchAPIClass.cjs';
import {BridgeDataProcessor} from './BridgeDataProcessor.cjs';
import fetch from 'node-fetch';

const credentials = {
    email: process.env.EMAIL,
    password: process.env.PSSWD
  };

const headers = {
    accept: 'application/json',
    'Bridge-Version': '2021-06-01',
    'content-type': 'application/json',
    'Client-Id': process.env.CLIENT_ID,
    'Client-Secret': process.env.CLIENT_SECRET
  };

const fetchAPI = new FetchAPI(headers, fetch);
const dataProcessor = new BridgeDataProcessor(fs, credentials, headers, fetchAPI);
dataProcessor.processAndSaveData();