
function openScanner() {
  document.getElementById('scannerModal').classList.remove('hidden');
  startScan();
}

function closeScanner() {
  document.getElementById('scannerModal').classList.add('hidden');
  html5QrcodeScanner.stop();
}


let html5QrcodeScanner = new Html5Qrcode("reader");

function startScan(){
  html5QrcodeScanner.start(
      { facingMode: "environment" }, // caméra arrière
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText, decodedResult) => {
        console.log("Code détecté :", decodedText);
        document.getElementById('liste_value').value += `${decodedText}, `
        html5QrcodeScanner.stop(); // arrêter après scan (ou pas)
        closeScanner()
      },
      (errorMessage) => {
        // console.warn(`Erreur de scan: ${errorMessage}`);
      }
    ).catch(err => {
      console.error("Erreur au démarrage du scanner :", err);
    });
}



// Submission handler (à lier avec API plus tard)
    document.getElementById('addCardForm').addEventListener('submit', function (e) {
      document.getElementById('modalWait').classList.remove('hidden')
      
      e.preventDefault();
      let data = new FormData(e.target);
      let nom = data.get('nom');
      let typeCode = data.get('typeCode');
      let typeCard = data.get('typeCard')
      let ids = data.get('ids').split(',').map(s => s.trim()).filter(s => s !== "");

      console.log({ nom, typeCode, typeCard, ids }); // à remplacer par l'appel à Google Apps Script

      add_carte(nom, typeCode, typeCard, ids)
      // Ajout visuel dynamique à venir
    });
