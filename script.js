document.getElementById("carbonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const carDistance = parseFloat(document.getElementById("carDistance").value);
  const actualDistance = parseFloat(document.getElementById("actualDistance").value);
  const transport = document.getElementById("transport").value;
  const photoInput = document.getElementById("photo");

  const emissionsPerKm = {
    car: 0.21,
    subway: 0.05,
    bus: 0.09,
    bike: 0,
    walk: 0
  };

  const carEmissions = carDistance * emissionsPerKm["car"];
  const actualEmissions = actualDistance * emissionsPerKm[transport];

  const savedCO2 = Math.max(0, carEmissions - actualEmissions);
  const reward = getReward(savedCO2);

  showResult(savedCO2, reward, transport, photoInput);
});

function getReward(saved) {
  if (saved > 2) return "에코 포인트 100점";
  if (saved > 1) return "텀블러 증정";
  if (saved > 0.5) return "카페 쿠폰";
  return "감사 스티커";
}

function showResult(savedCO2, reward, transport, photoInput) {
  const resultDiv = document.getElementById("result");

  let photoHTML = "";
  if (photoInput.files.length > 0) {
    const imgURL = URL.createObjectURL(photoInput.files[0]);
    photoHTML = `<p>📸 인증 사진:</p><img src="${imgURL}" width="100%" style="border-radius: 10px;"/>`;
  }

  const transportLabel = {
    subway: "지하철",
    bus: "버스",
    bike: "자전거",
    walk: "도보"
  };

  resultDiv.innerHTML = `
    <h3>탄소 절감 결과</h3>
    <p>이동 수단: <strong>${transportLabel[transport]}</strong></p>
    <p>절감한 탄소량: <strong>${savedCO2.toFixed(2)} kg CO₂</strong></p>
    <p>🎁 보상: <strong>${reward}</strong></p>
    ${photoHTML}
  `;
}
