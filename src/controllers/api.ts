"use strict";

import async from "async";
import request from "request";
import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import { connectDB, getConfig } from "../services/dalService";
import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../util/secrets";
const moment = require('moment');
const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const assert = require('assert');
const emoji = require('node-emoji');

const mongoUrl = MONGODB_URI;
const dbName = 'ananas';

/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples"
  });
};

export let getUsers = async (req: Request, res: Response) => {

  MongoClient.connect(mongoUrl, async (err: any, client: any) => {
    try {
      assert.equal(null, err);
      const db = client.db(dbName);
      let users = await db.collection("users").find({}).toArray();
      client.close();
      res.send(users);
    }
    catch (error) {
      client.close();
      res.status(500).send(error.message);
    }
  });

};

export let getEvents = async (req: Request, res: Response) => {

  MongoClient.connect(mongoUrl, async (err: any, client: any) => {
    try {
      assert.equal(null, err);
      const db = client.db(dbName);
      let events = await db.collection("events").find({}).toArray();
      client.close();
      res.send(events);
    }
    catch (error) {
      client.close();
      res.status(500).send(error.message);
    }
  });

};

export let sendMessage = async (req: Request, res: Response) => {
  
  try {
    
    const accountSid = await getConfig("accountSid");
    const authToken = await getConfig("authToken");
    const sender = await getConfig("senderName");    
    const recipent = "משה";
    const emojiPineapple = emoji.find('pineapple');

    const db = await connectDB();
    const events = await db.collection('events').find({}).toArray();

    const body = `היי ${recipent}, רציתי להזמין אותך למפגש הבא שלנו שיתקיים ביום ${events[0].weekDay}
      בתאריך: ${moment(events[0].date, 'DD-MM-YYYY').format("DD/MM/YY")}
      בשעה: ${events[0].time}
      האם תרצה להגיע?
      אשמח לראותך, ${sender}.
      ${emojiPineapple.emoji} אננס מפגשים`

    const client = new twilio(accountSid, authToken);

    client.messages.create({
      body: body,
      to: '+972523442022',
      from: '+17372140351'
    })
      .then((message: any) => {
        res.send(message.sid);
      }, (error: any) => {
        console.log(error.message);
        res.status(500).send(`Something went wrong: ${error.message}`);
      });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send(`Something went wrong: ${error.message}`);
  }

};

export let receiveMessage = async (req: Request, res: Response) => {
  
  try {

    const twiml = new MessagingResponse();
    
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send(`Something went wrong: ${error.message}`);
  }

};