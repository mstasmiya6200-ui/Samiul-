document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resultForm');
    const rollInput = document.getElementById('rollNumber');
    const nameCell = document.getElementById('tableName');
    const rollCell = document.getElementById('tableRoll');

    // রোল নাম্বার ইনপুট পরিবর্তন হলে নাম আপডেট করার জন্য
    rollInput.addEventListener('input', function() {
        const roll = this.value;
        let name = '';

        // এখানে আমরা একটি ডামি ডেটা ব্যবহার করছি।
        // বাস্তবে এই ডেটা সার্ভার থেকে আনা উচিত।
        const studentData = {
            1: 'আব্দুল করিম',
            2: 'সাকিব হাসান',
            3: 'নাসরিন আক্তার',
            4: 'আসিফ ইকবাল',
            5: 'ফাতিমা বেগম',
            // ... এভাবে ৫০ জন শিক্ষার্থীর নাম যোগ করতে পারো
        };

        if (roll >= 1 && roll <= 50) {
            name = studentData[roll] || `শিক্ষার্থী ${roll}`;
        }
        
        nameCell.textContent = name;
        rollCell.textContent = roll;
    });

    // ফর্ম সাবমিট হলে
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // ডিফল্ট সাবমিট বন্ধ করা

        const roll = rollInput.value;
        const cluster = document.getElementById('cluster').value;

        if (roll && cluster) {
            // এইখানে তুমি তোমার পরবর্তী রেজাল্ট পেজের URL বসিয়ে দেবে।
            const resultPageUrl = `result.html?roll=${roll}&cluster=${cluster}`;
            window.location.href = resultPageUrl;
        } else {
            alert('অনুগ্রহ করে রোল নাম্বার এবং গুচ্ছ নির্বাচন করুন।');
        }
    });
});
