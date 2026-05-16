// ডাটাবেজ থেকে রেজাল্ট লোড করা
async function loadResults() {
  try {
    // Netlify Function থেকে ডাটা আনা
    const response = await fetch('/.netlify/functions/getResults');
    const results = await response.json();

    // রেজাল্ট টেবিল তৈরি করা
    const tableHTML = `
      <table class="results-table">
        <thead>
          <tr>
            <th>সিরিয়াল</th>
            <th>রোল নম্বার</th>
            <th>শিক্ষার্থীর নাম</th>
            <th>সাবজেক্ট</th>
            <th>জিপিএ</th>
          </tr>
        </thead>
        <tbody>
          ${results.map(result => `
            <tr>
              <td>${result.serial}</td>
              <td>${result.roll}</td>
              <td>${result.name}</td>
              <td>${result.subject}</td>
              <td>${result.gpa}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // HTML এ রেজাল্ট দেখানো
    const resultsContainer = document.getElementById('results-list');
    if (resultsContainer) {
      resultsContainer.innerHTML = tableHTML;
    }
  } catch (error) {
    console.error('রেজাল্ট লোড করতে ভুল:', error);
    document.getElementById('results-list').innerHTML = '<p style="color: red;">রেজাল্ট লোড করতে সমস্যা হয়েছে</p>';
  }
}

// পেজ লোড হলে রেজাল্ট দেখানো
document.addEventListener('DOMContentLoaded', loadResults);
