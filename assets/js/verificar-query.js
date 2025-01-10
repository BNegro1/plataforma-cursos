// Revisar la query string (ej: /login?success=1 o /login?error=1)
const params = new URLSearchParams(window.location.search);

if (params.get('success') === '1') {
    // Muestra toast verde
    const toastEl = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

if (params.get('error') === '1') {
    // Muestra toast rojo
    const toastEl = document.getElementById('errorToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}