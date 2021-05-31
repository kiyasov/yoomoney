require("dotenv").config();

const express = require("express");
const axios = require("axios");
const qs = require("qs");

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

express()
  .get("/", async (req, res) => {
    res.redirect(
      "https://yoomoney.ru/oauth/authorize?" +
        qs.stringify({
          client_id: CLIENT_ID,
          response_type: "code",
          redirect_uri: "https://yoomoneyapi.herokuapp.com/getToken",
          scope: "account-info operation-history operation-details payment-shop"
        })
    );
  })
  .get("/getToken", async (req, res) => {
    const { data } = await axios.post(
      "https://yoomoney.ru/oauth/token",
      qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: "https://yoomoneyapi.herokuapp.com/getToken",
        grant_type: "authorization_code",
        code: req.query.code
      })
    );

    res.end(data.access_token);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
