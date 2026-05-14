var Tawk_API = Tawk_API || {};

document.addEventListener('submit', function (e) {
    var form = e.target;
    
    // Check a custom attribute to see if we've already processed this form
    // This prevents the "stuck" infinite loop
    if (form.getAttribute('data-submitting') === 'true') {
        return; 
    }

    // Stop the initial redirect
    e.preventDefault();
    form.setAttribute('data-submitting', 'true');

    // 1. Capture Data
    var emailInput = document.getElementById('email')?.value || '';
    var phoneVal = document.getElementById('phone')?.value || 'N/A';

    var finishSubmission = function() {
        // Maximize the chat window ONLY now, at the point of submission
        if (typeof Tawk_API !== "undefined" && Tawk_API.maximize) {
            Tawk_API.maximize();
        }
        // Execute the actual redirect/form send
        form.submit();
    };

    // 2. Sync with Tawk.to
    if (typeof Tawk_API !== "undefined" && Tawk_API.setAttributes) {
        Tawk_API.setAttributes({
            'name': emailInput || 'New Lead',
            'email': emailInput.includes('@') ? emailInput : '',
            'phone': phoneVal
        });

        // Small delay to ensure Tawk registers the data before the page changes
        setTimeout(finishSubmission, 500);
    } else {
        // If Tawk isn't loaded, just finish immediately
        finishSubmission();
    }

    // 3. Safety Timeout (Backup)
    // If anything fails, force the submit after 1.5 seconds so the user isn't stuck
    setTimeout(finishSubmission, 1500);
});
