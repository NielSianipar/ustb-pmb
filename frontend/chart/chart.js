
 const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["A", "B", "C"],
      datasets: [{
        label: "Contoh",
        data: [12, 19, 3]
      }]
    }
  });