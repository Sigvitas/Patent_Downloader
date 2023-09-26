function downloadPDF() {
    // Get the patent number from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const patentNumber = urlParams.get('patent');

    // Generate the URL for downloading the granted patent PDF
    const grantedDownloadURL = `https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/${patentNumber}`;

    // Generate the URL based on the patent number for the USPTO Patent Center application
    const patentCenterURL = `https://patentcenter.uspto.gov/applications/${patentNumber}/ifw/docs?application=${patentNumber}`;

    if (filedCheckbox.checked && specificationCheckbox.checked) {
        // Add your CURL command logic here
        // You can use JavaScript's fetch API to make the POST request to the specified URL
        // For security reasons, you should make this request from your server-side code

        // For demonstration purposes, we'll show an alert instead
        alert("Downloading Specification document from the server...");
    } else if (grantedCheckbox.checked) {
        // Initiate the download of the granted patent without navigating to the URL
        const link = document.createElement("a");
        link.href = grantedDownloadURL;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // Handle other checkbox combinations or download logic as needed
        alert("Please select 'Patent as Filed' and 'Specification' to download the specification document or 'Granted Patents' to download the granted patent.");
    }

    if (filedCheckbox.checked && specificationCheckbox.checked) {
        // Define the URL where you want to send the POST request
        const apiUrl = 'https://patents.tvornica.net/api/download-available-documents/';

        // Define the headers for the request
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NzA4OTU5LCJpYXQiOjE2OTU3MDUzNTksImp0aSI6Ijc3NWZhYjNmYjNlZTRiYjY5YzEyZDg0ZmFmZTY1MzE1IiwidXNlcl9pZCI6ImVmYTU1MzkzLTY2OWEtNGJlYy1aYmUwLTc2YTZiZWQ0ZDUyNiJ9.ltcohFMNELH9yV3oQyEkVNaTZQ0BpFrCkDdv4NqM7cI',
            'Content-Type': 'application/json',
            'X-CSRFToken': '2lb1dzLVZulidWzqXmASL5fElipxCJawou9ZVTwSu5A3Dp0aXkKDk8EyEz9l65mK'
        };

        // Define the data to send in the request body
        const requestData = {
            numbers: "10000009",
            date_from: "2000-09-26",
            date_to: "2023-09-26",
            document_code: "SPEC",
            desired_apps_extended_info: false
        };

        // Make the POST request using the fetch API
        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data as needed
                console.log(data); // You can process the response here
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
