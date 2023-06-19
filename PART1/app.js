"use strict";

$(async function() {

    const baseURL = "http://numbersapi.com";
    const $request1 = $("#request1");
    const $request2 = $("#request2");
    const $request3 = $("#request3");
    const favoriteNumber = 26;
    const listOfFavoriteRangeNumber = [5,21,26,86];

    let res1 = await axios.get(`${baseURL}/${favoriteNumber}?json`);
    if (res1){
        console.log(res1.data.text);
        $request1.append(`<li>${res1.data.text}</li>`)
    }

    let res2 = await axios.get(`${baseURL}/${listOfFavoriteRangeNumber}?json`);
    if (res2){
        for (const [key, value] of Object.entries(res2.data)) {
            $request2.append(`<li>${value}</li>`)
          }
    }
    
    let listOfRequest=[];
    for (let i = 0; i < 4; i++) { 
        listOfRequest.push(axios.get(`${baseURL}/${favoriteNumber}?json`));
    }
    let req = await Promise.all(listOfRequest);
    req.forEach(res => $request3.append(`<li>${res.data.text}</li>`));
});
