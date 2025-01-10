const successFlag = '{{ successParam }}';  // "reg", "log", o vacío.

if (successFlag === 'reg') {
    // Mostrar toast de registro exitoso
    const toastEl = document.getElementById('regToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
} else if (successFlag === 'log') {
    // Mostrar toast de login
    const toastEl = document.getElementById('logToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
