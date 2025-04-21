// Handles dropdown information 

function toggleDropdown(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector(".arrow");

    if (content.style.display === "block") {
        content.style.display = "none";
        element.classList.remove("open");
    } else {
        content.style.display = "block";
        element.classList.add("open");
    }
}


// Handles the form submission
// and sends the data to the server using fetch API
document.getElementById("anamnese").addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("Formulário foi submetido");

    const formData = Object.fromEntries(new FormData(event.target).entries());

    
    try { // Sending the data to the server
        const response = await fetch('http://localhost:3000/anamnese', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Verifying if the response is JSON
        const text = await response.text(); // Read the response as text first
        let resultado;
        try {
            resultado = JSON.parse(text); // Try to parse the text as JSON
        } catch (jsonError) {
            throw new Error('Resposta não é JSON');
        }

        // Check if the response contains the expected properties
        if (resultado.success) {
            alert(resultado.message || 'Formulário enviado com sucesso!');
        } else {
            alert(resultado.error || 'Ocorreu um erro ao enviar o formulário.');
        }

    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Ocorreu um erro ao enviar o formulário. Verifique sua conexão ou tente novamente mais tarde.');
    }
});