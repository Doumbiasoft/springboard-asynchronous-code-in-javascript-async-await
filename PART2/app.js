
$(async function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
    const $request1 = $("#request1");
    const $request2 = $("#request2");

    let res1 = await axios.get(`${baseURL}/new/draw/`);
    if (res1){
      let { suit, value } = res1.data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      $request1.append(`<li>${value.toLowerCase()} of ${suit.toLowerCase()}</li>`);
    }

    let firstCard = null;
      let res2 = await axios.get(`${baseURL}/new/draw/`);
      if (res2){
        firstCard = res2.data.cards[0];
        let deckId = res2.data.deck_id;
        let res3 = await axios.get(`${baseURL}/${deckId}/draw/`);
        if(res3){
          let secondCard = res3.data.cards[0];
          [firstCard, secondCard].forEach(function(card) {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
            $request2.append(`<li>${card.value.toLowerCase()} of ${card.suit.toLowerCase()}</li>`);
          });
        }
      }

    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');
 
    let res4 = await axios.get(`${baseURL}/new/shuffle/`)
    if (res4){
      deckId = res4.data.deck_id;
      $btn.show();
    }

    $btn.on('click', async function() {
        
        let res5 = await axios.get(`${baseURL}/${deckId}/draw/`);
        if (res5){
          let cardSrc = res5.data.cards[0].image;
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
          $cardArea.append(
                $('<img>', {
                  src: cardSrc,
                  css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                  }
                })
              );
          if (res5.data.remaining === 0) $btn.remove();
        }
    });


  });
  