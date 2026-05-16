const { createClient } = require('@supabase/supabase-js');

// Netlify Database এ কানেকশন
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

exports.handler = async (event, context) => {
  try {
    const { serial, roll, name, subject, gpa } = JSON.parse(event.body);

    // ডাটা ভ্যালিডেশন
    if (!serial || !roll || !name || !subject || !gpa) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          error: 'সব ফিল্ড প্রয়োজন' 
        })
      };
    }

    // Result টেবিলে ডাটা যোগ করা
    const { data, error } = await supabase
      .from('Result')
      .insert([
        {
          serial: serial,
          roll: roll,
          name: name,
          subject: subject,
          gpa: gpa
        }
      ]);

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false,
          error: error.message 
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'রেজাল্ট যোগ হয়েছে',
        data: data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: error.message 
      })
    };
  }
};
