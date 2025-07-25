const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const requestOptionsGet = {
                            method: "GET",
                            redirect: "follow"
                          };


const url_api = "https://script.google.com/macros/s/AKfycbw7bB5Qde6ib9wAJdhGmkx39dXYQ2FBuAOg6SA-iB0HE1nKEuLbx9HjJpo9enG9kG20Hw/exec"


function showToast(message, type = 'info', duration = 3000) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  // Réinitialiser les classes de position + animation
  toast.className = 'fixed bottom-4 right-4 px-4 py-3 rounded shadow-md border hidden transition-opacity duration-300 z-50';

  // Définir les couleurs personnalisées selon le type
  switch (type) {
    case 'success':
      toast.style.backgroundColor = '#22c55e'; // green-500
      toast.style.color = 'white';
      toast.style.borderColor = '#16a34a';     // green-600
      break;
    case 'info':
      toast.style.backgroundColor = '#2563eb';  // bleu plus 
      toast.style.color = 'white';
      toast.style.borderColor = '#1e40af';
      break;
    case 'error':
      toast.style.backgroundColor = '#ef4444'; // red-500
      toast.style.color = 'white';
      toast.style.borderColor = '#dc2626';     // red-600
      break;
    case 'warning':
      toast.style.backgroundColor = '#f97316'; // orange-500
      toast.style.color = 'white';
      toast.style.borderColor = '#ea580c';     // orange-600
      break;
    default: // info
      toast.style.backgroundColor = '#ffffff';  // blanc
      toast.style.color = '#1f2937';            // gris 
      toast.style.borderColor = '#e5e7eb';      // gris 
      break;
  }

  // Afficher le message
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('opacity-100');

  // Masquer automatiquement
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, duration);
}









function genererCode(longueur) {
  const caracteres = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  let code = '';

  for (let i = 0; i < longueur; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    code += caracteres.charAt(index);
  }

  return code;
}





 function togglePassword(password) {
      var input = document.getElementById(password);
      var icon = document.getElementById(`eye-icon_${password}`);

      if (input.type === "password") {
        input.type = "text";
        icon.src = "https://cdn-icons-png.flaticon.com/512/12603/12603998.png";  // oeil fermé
      } else {
        input.type = "password";
        icon.src = "https://cdn-icons-png.flaticon.com/512/2115/2115194.png"; // oeil ouvert
      }
}



