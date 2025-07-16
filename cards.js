

addEventListener("DOMContentLoaded", (event) => {
      const infos = JSON.parse(localStorage.getItem("infos"))
      
      const cartes = JSON.parse(infos.cartes);

      // Ajout des cartes à l'interface
      const container = document.getElementById('cardContainer');
      cartes.forEach((carte, i) => {
        container.appendChild(createCard(carte, i));
      });
})





function toggleFlip(card) {
      card.classList.toggle('flipped');
    }

    function addCardModal() {
      document.getElementById('add_card').classList.remove('hidden');
      document.getElementById('main_container').classList.add('hidden');
    }



    function closeModal() {
     document.getElementById('main_container').classList.remove('hidden'); document.getElementById('add_card').classList.add('hidden');
    }






function createCard(carte, index) {
  const card = document.createElement('div');
  card.className = 'card-container';

  card.innerHTML = `
     <div class="card w-full h-72 bg-white rounded-xl shadow-lg mx-auto" id="card-${index}">
      <!-- Recto -->
      <div style="padding: 70px 0; text-align: center;" class="card-face grid items-center justify-center p-6">
        <b>${carte.nom}</b>
        <img src="https://lh3.googleusercontent.com/d/${carte.logo}" alt="${carte.nom}" class="h-20">
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



  
