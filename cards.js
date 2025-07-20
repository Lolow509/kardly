

let infos
let cartes

addEventListener("DOMContentLoaded", (event) => {
      infos = JSON.parse(localStorage.getItem("infos"))

       if(infos == null){
            window.location = "./"
      } 
      
      cartes = JSON.parse(infos.cartes);

  


     

      // Ajout des cartes à l'interface
      const container = document.getElementById('cardContainer');
      cartes.forEach((carte, i) => {
        container.appendChild(createCard(carte, i));
      });
})


function logout(){
      localStorage.removeItem("infos");
      window.location = "./"
}




function toggleFlip(card) {
      card.classList.toggle('flipped');
    }

    function addCardModal() {
      //visible
      document.getElementById('add_card').classList.remove('hidden');

      //invisible
      document.getElementById('parametre').classList.add('hidden');
      document.getElementById('main_container').classList.add('hidden');
    }


function openSettings() {
      //visible
      document.getElementById('parametre').classList.remove('hidden');

      //invisible
      document.getElementById('add_card').classList.add('hidden');
      document.getElementById('main_container').classList.add('hidden');
      document.getElementById('nav_home').classList.add('hidden');

      document.getElementById('modalWait').classList.remove('hidden');

      get_parametre()
    }



    function closeModal() {
     document.getElementById('main_container').classList.remove('hidden'); document.getElementById('add_card').classList.add('hidden');
    }



      function closeModalWait() {
     document.getElementById('modalWait').classList.remove('hidden'); document.getElementById('add_card').classList.add('hidden');
    }


function get_parametre(){
      document.querySelector('#user_id').value = infos.id
      document.querySelector('#user_nom').value = infos.nom
      document.querySelector('#user_pseudo').value = infos.pseudo
      document.querySelector('#user_numero').value = infos.numero
      document.querySelector('#user_sexe').value = infos.sexe
      document.querySelector('#user_age').value = infos.age
      document.querySelector('#user_email').value = infos.email

      document.getElementById('modalWait').classList.add('hidden');
      
}

document.getElementById('settingsForm').addEventListener('submit', function (e) {
      document.getElementById('modalWait').classList.remove('hidden')
      
      e.preventDefault();

      let data = new FormData(e.target)

      let user_pseudo = data.get('user_pseudo')
      let user_numero = data.get('user_numero')
      let user_sexe = data.get('user_sexe')
      let user_age = data.get('user_age')


      data_update = [user_pseudo, user_numero, user_sexe, user_age ]

      isValid = data_update.every(value => value !== undefined && value !== null && value.toString().trim() !== "");

            if (!isValid) {
              showToast("Veuillez remplir tous les champs obligatoires.", "warning");
              document.getElementById('modalWait').classList.add('hidden')
              
            } else {
                  update_info(user_pseudo, user_numero, user_sexe, user_age)
            }
            
      
      
})



function update_info(user_pseudo, user_numero, user_sexe, user_age){
      uid = infos.id
         

      data = JSON.stringify({
            "action" : "update_user",
            "id" : uid,
            "pseudo" : user_pseudo,
            "numero": user_numero,
            "sexe": user_sexe,
            "age": user_age,
      })


      
      data_encode = encodeURIComponent(data)


  getUrl = `${url_api}?info=${data_encode}`

  fetch(getUrl, requestOptionsGet)
  .then((response) => response.json())
  .then((get_data) => {
    console.log(get_data)

    if(get_data.success == true){
      infos.pseudo = user_pseudo
      infos.numero = user_numero
      infos.sexe = user_sexe
      infos.age = user_age

      localStorage.setItem("infos", JSON.stringify(infos) );
      document.getElementById('modalWait').classList.add('hidden')

          document.getElementById('parametre').classList.add('hidden');
          document.getElementById('main_container').classList.remove('hidden');
          document.getElementById('nav_home').classList.remove('hidden');  

          showToast("Paramètre mis a jour avec succès ", "success")


          
    } else {
          showToast("Une erreur est survenue !", "error")
    }

  })

      
}










function createCard(carte, index) {
  const card = document.createElement('div');
  card.className = 'card-container';

  card.innerHTML = `
     <div class="card w-full h-72 bg-white rounded-xl shadow-lg mx-auto" id="card-${index}">
      <!-- Recto -->
      <div style="padding: 70px 0; text-align: center;" class="card-face grid items-center justify-center p-6">
        <b>${carte.nom}</b>
        <img style="margin:auto" src="${carte.logo}" alt="${carte.nom}" class="h-20">
      </div>

      <!-- Verso -->
      <div class="card-face card-back bg-bleu-100 p-4 rounded-xl flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-semibold text-center mb-2">${carte.nom}</h2>
          <div style="height:170px" id="id-display-${index}" class="bg-white rounded p-3 shadow text-center mb-4 min-h-[120px] flex flex-col items-center justify-center">
            <!-- identifiant dynamique ici -->
          </div>
          <div class="flex justify-center space-x-2" id="nav-${index}"></div>
        </div>
      </div>
    </div>

  `;

  const cardElement = card.querySelector(`#card-${index}`);
  cardElement.addEventListener('click', () => {
    cardElement.classList.toggle('flipped');
  });

  const displayContainer = card.querySelector(`#id-display-${index}`);
  const navContainer = card.querySelector(`#nav-${index}`);

  function renderId(idValue, idIndex) {
    const clean = idValue;
    const typeCode = (carte.typeCode || '').toUpperCase();

    displayContainer.innerHTML = ''; // Clear

    if (typeCode === 'QR') {
      displayContainer.innerHTML = `
        <p class="text-sm text-gray-700 mb-2">${clean}</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(clean)}" class="mx-auto">
      `;
    } else if (typeCode === 'BARCODE') {
      displayContainer.innerHTML = `
        <svg id="barcode-${index}-${idIndex}" class="mx-auto"></svg>
      `;
      setTimeout(() => {
        JsBarcode(`#barcode-${index}-${idIndex}`, clean, {
          format: "CODE128",
          width: 2,
          height: 40,
          displayValue: true
        });
      }, 50);
    } else {
      displayContainer.innerHTML = `<p class="text-sm text-gray-800">${clean}</p>`;
    }

    // Mise à jour de la couleur des boutons
    const allButtons = navContainer.querySelectorAll('button');
    allButtons.forEach((btn, idx) => {
      btn.style.backgroundColor = (idx === idIndex) ? 'cornflowerblue' : '#d1d5db';
    });
  }

  // Init
  renderId(carte.ids[0], 0);

  // Create nav
  carte.ids.forEach((id, idIndex) => {
    const btn = document.createElement('button');
    btn.className = 'w-3 h-3 rounded-full bg-gray-300 hover:bg-blue-500 transition';
    btn.style.backgroundColor = idIndex === 0 ? 'cornflowerblue' : '#d1d5db';
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // empêcher le flip au clic
      renderId(id, idIndex);
    });
    navContainer.appendChild(btn);
  });

  return card;
}




function add_carte(nom, typeCode, typeCard, ids){
  document.getElementById('modalWait').classList.remove('hidden')
      uid = infos.id

    new_carte = { nom, ids, typeCode, "logo" : typeCard}


      //id, cartes, action = update_cartes

      cartes.push(new_carte)

      carte_string = JSON.stringify(cartes)
         

      data_post = JSON.stringify({
            "action" : "update_cartes",
            "id" : uid,
            "cartes" : carte_string
      })


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("info", data_post);

var requestOptionsPost = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
}


       fetch(url_api, requestOptionsPost)
        .then((response) => response.json())
        .then((get_data) => {
          console.log(get_data)
                                
                      if(get_data.success == true){
                        //ajouter à la dashboard
                        index = cartes.length - 1
                        new_div = createCard(cartes[index], index)
                        document.querySelector('#cardContainer').appendChild(new_div)
                  
                        //ajouter à localstorage
                        infos.cartes = carte_string
                        localStorage.setItem("infos", JSON.stringify(infos) );
                  
                        document.getElementById('modalWait').classList.add('hidden')
                        closeModal();
                        
                      }
                        
              
      
        })







      
}










  
