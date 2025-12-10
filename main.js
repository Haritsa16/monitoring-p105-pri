// GANTI dengan alamat backend kamu
const baseURL = "http://localhost:3000";
// atau "http://192.168.1.10:3000" kalau backend di PC lain

async function loadLast() {
  try {
    const r = await fetch(`${baseURL}/api/readings/last`);
    const d = await r.json();
    if (!d) return;

    document.getElementById("temp").textContent = d.temp.toFixed(2);
    document.getElementById("rh").textContent = d.rh.toFixed(2);
    document.getElementById("thi").textContent = d.thi.toFixed(2);
  } catch (err) {
    console.error("Failed to load last reading", err);
  }
}

async function loadHistory() {
  try {
    const r = await fetch(`${baseURL}/api/readings?limit=50`);
    const rows = await r.json();
    const tb = document.getElementById("rows");
    tb.innerHTML = "";

    rows.forEach((x) => {
      tb.innerHTML += `
        <tr>
          <td>${x.ts}</td>
          <td>${x.temp.toFixed(2)}</td>
          <td>${x.rh.toFixed(2)}</td>
          <td>${x.thi.toFixed(2)}</td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("Failed to load history", err);
  }
}

// panggil sekali di awal
loadLast();
loadHistory();

// optional: refresh tiap 10 detik
setInterval(() => {
  loadLast();
  loadHistory();
}, 10000);
