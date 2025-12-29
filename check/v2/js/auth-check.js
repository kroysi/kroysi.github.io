(async function() {
  try {
    const res = await fetch('https://auth.kroysi.ru/verify', { credentials: 'include' });
    const data = await res.json();
    if (!data.valid) {
      window.location.href = 'https://auth.kroysi.ru/login';
    }
  } catch (e) {
    window.location.href = 'https://auth.kroysi.ru/login';
  }
})();
