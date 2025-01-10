
const params = new URLSearchParams(window.location.search);
if (params.get('error') === '1') {
    const toastEl = document.getElementById('errorToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}