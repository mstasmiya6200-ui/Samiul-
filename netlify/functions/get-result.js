const { Client } = require('pg');

exports.handler = async (event, context) => {
    // CORS Headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
    };

    const roll = event.queryStringParameters.roll;
    if (!roll) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "রোল নম্বর প্রয়োজন!" })
        };
    }

    const client = new Client({
        connectionString: process.env.NETLIFY_DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        // ডাটাবেজ থেকে তথ্য খোঁজার কুয়েরি
        const result = await client.query('SELECT * FROM students_results WHERE roll_number = $1', [roll]);

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: "এই রোলের কোনো ফলাফল পাওয়া যায়নি।" })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows[0])
        };

    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "ডাটাবেজ কানেকশনে সমস্যা হচ্ছে।" })
        };
    } finally {
        await client.end();
    }
};
