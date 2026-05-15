const { Client } = require('pg');

exports.handler = async (event) => {
  // ইউজার যে রোল নম্বরটি সার্চ করবে সেটি ধরবে
  const roll = event.queryStringParameters.roll;

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    // ডাটাবেজ থেকে ওই রোলের তথ্য খোঁজা
    const res = await client.query('SELECT * FROM students_results WHERE roll_number = $1', [roll]);
    await client.end();

    if (res.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "রেজাল্ট পাওয়া যায়নি" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(res.rows[0]),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "সার্ভার সমস্যা", details: err.message }),
    };
  }
};

