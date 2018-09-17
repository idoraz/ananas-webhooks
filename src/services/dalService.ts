"use strict";

import async from "async";
import request from "request";
import { Response, Request, NextFunction } from "express";
import { MONGODB_URI } from "../util/secrets";
import { MongoClient, Db } from 'mongodb';
const assert = require('assert');
const mongoUrl = MONGODB_URI; //TODO: need more security maybe?
const dbName = 'ananas';

let _db: Array<any> = [];

export let connectDB: any = async (url: any = null) => {

    if (_db[url]) {
        return _db[url];
    }

    let client: MongoClient = await MongoClient.connect(url || mongoUrl, { poolSize: 20 });
    const db = client.db(dbName);

    // When the mongodb server goes down, the driver emits a 'close' event
    db.on('close', () => { console.log('-> lost connection'); });
    // The driver tries to automatically reconnect by default, so when the
    // server starts the driver will reconnect and emit a 'reconnect' event.
    db.on('reconnect', () => { console.log('-> reconnected'); });

    _db[url] = db;
    console.log("Connected successfully to DB server");
    return await db;
};

export let getConfig: any = async (configName: string) => {

    try {
        const db = await connectDB();
        let config = await db.collection("config").findOne({ config_name: configName });            
        return config.config_value;
    }
    catch (error) {
        console.log(error.message);
        return;
    }

};

